addOneMaybe :: Maybe Int -> Maybe Int
addOneMaybe (Just a) = Just (a + 1)
addOneMaybe Nothing  = Nothing

addOneMaybe (Just 3)
-- Just 4
addOneMaybe Nothing
-- Nothing

addOneList :: [Int] -> [Int]
addOneList = map (+1)

addOneList [1..2]
-- [2,3,4]

-- 以上两个函数的共同点： 希望处理包裹在盒子里的值，处理完的结果放回盒子里，如果盒子携带某些
-- 额外的信息（Nothing 表示失败，列表表示多个元素），就保留这些额外的信息不变。
-- someFunction :: f a -> f b 抽象出的通用类型 f 是类型变量 还有一个处理单元素的函数
-- someFunction :: a -> b  从 a -> b 得到 f a -> f b 即：
-- fmap :: (a -> b) -> f a -> f b
-- 当盒子类型不同时，fmap 的实现也不同，所以通过类型类解决这个问题
class Functor f where
  fmap :: (a -> b) -> f a -> f b

instance Functor [] where
  fmap = map

instance Functor Maybe where
  fmap f (Just a) = Just (f a)
  fmap _ Nothing  = Nothing

-- 双元组
instance Functor ((,) a) where
  fmap f (x, y) = (x, f y)

-- 由于 Functor 只能接受一个type constructor 所以 (->) 不是 Functor 的 instance
-- 但 (->) a 则是。 其实就是 function composition
instance Functor ((->) a) where
  fmap :: (b -> c) -> ((->) a b) -> ((->) a c)
  fmap :: (b -> c) -> (a -> b) -> (a -> c)
  fmap f fa = f . fa
  -- or
  fmap = (.)

  (.) :: (b -> c) -> (a -> b) -> a -> c
  f . g = \x -> f (g x)

fmap (*3) (+1)
-- \x -> (x+1) * 3
fmap (-3) (*4) $ 4
-- 13


newtype Identity a = Identity { runIdentity :: a }
Identity 3 :: Identity Int
runIdentity $ Identity 3
-- 3

instance Functor Identity where
  fmap f idx = Identity (f (runIdentity idx))
  -- point-free
  fmap f = Identity . f . runIdentity

fmap (+1) (Identity 3)
-- Identity 4

fmap id (Identity 3) == id (Identity 3)
fmap ((+1) . (*2)) $ Identity 3 == fmap (+1) . fmap (*2) $ Identity 3

-- = 左边出现的类型变量没有出现在右边，叫作幻影类型(phantom type)
newtype Const a b = Const { getConst :: a }

Const 3 :: Const Int String
Const 3 :: Const Int Int

getConst $ Const 3
-- 3

instance Functor (Const a) where
  fmap f c = c

fmap (*2) (Const 3) -- Const 3

fmap ((*3) . (+2)) $ Const 3 == fmap (*3) . fmap (+2) $ Const 3
