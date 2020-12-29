
-- 函子是应用函子的父类型类，一个函子想成为应用函子，就必须提供以下两个函数：
-- pure 接收一个参数并把它包裹到函子里，这个函数的作用就是赋予参数一个不影响计算语义的盒子，这个升格值的过程称作添加最小上下文（minimum context）
-- <*> 是计算的核心，它可以把包裹在函子中的函数和包裹在函子中的参数取出并计算，或者根据函子的上下文直接给出结果，这也是<*>被称作函子应用运算符的原因。计算的结果将仍然包裹在函子类型中。
-- pure 和 <*> 函数一定需要满足下面4个条件：
-- 单位律（identity）： pure id <*> v ≡ v
-- 组合律（composition）：pure (.) u <*> v <*> w ≡ u <*> (v <*> w)
-- 同态律（homomorphism）：pure f <*> pure x ≡ pure (f x)
-- 互换律（interchange）：u <*> pure y ≡ pure ($ y) <*> u

class Functor f => Applicative f where
  pure :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b


instance Applicative Maybe where
  pure = Just
  Nothing <*> _ = Nothing
  (Just f) <*> x = fmap f x

Just (+3) <*> Just 9
-- Just 12
pure (*2) <*> Just 5
-- Just 10

instance Applicative [] where
  pure x = [x]
  fs <*> xs = concat $ map (\f -> map f xs) fs
  -- or
  fs <*> xs = [f x | f <- fs, x <- xs]

[(*1),(*2)] <*> [1,2,3]
-- [1,2,3,2,4,6]
fmap replicate [1,2,3] <*> ['x', 'y', 'z']
-- ["x","y","z","xx","yy","zz","xxx","yyy","zzz"]

-- Reader 应用函子 (->) a
instance Applicative ((->) a) where
  pure :: x -> a -> x
  pure = const
  --pure x = \_ -> x
  (<*>) :: (r -> x -> y) -> (r -> x) -> r -> y
  -- fxy <*> fx = \a -> fxy a $ fx a
  (<*>) f g r = f r (g r)
-- pure f <*> g r
-- pure f r (g r) 
-- f (g r)

hyperSum = pure (\x y z -> x + y + z) <*> (^2) <*> (^3) <*> (^4)
-- \x -> (x^2) + (x^3) + (x^4)
hyperSum 3
-- 117

-- 自然升格 fmap 的中缀版本
(<$>) :: (a -> b) -> f a -> f b
(<$>) = fmap
-- f <$> x = fmap f x

infixl 4 <$>  4

(+1) <$> [1,2,3]
-- [2,3,4]

(+) <$> Just 1 <*> Just 2
-- Just 3
(+) <$> Just 1 <*> pure 2
-- Just 3
replicate <$> Just 10 <*> Just 'x'
-- Just "xxxxxxxxxx"
(\x y z -> x + y + z) <$> (^2) <*> (^3) <*> (^4) $ 3
-- 117

-- ... <$> ... <*> ... <*> ...
-- 这类写法叫做自然升格，第一个表达式是一个参数数量为 n 的函数，后面用<$> 连接第一个参数，得到升格之后的后续运算，然后用<*> 连接剩下
-- 的 n-1 个参数即可。升格的过程在第一个<$> 中被自然完成了，这些参数都要包裹在函子类型里。

-- 在 Data.Functor 中，提供了在自然升格写法下需要的两个中缀函数：
(<$) :: Functor f => a -> f b -> f a
(<$) = fmap . const

infixl 4 <$

($>) :: Functor f => f a -> b -> f b
($>) = flip (<$)

infixl 4 $>

[1..10] $> 'a'
-- flip (fmap . const) [1..10] 'a'
-- fmap (const 'a') [1..10]
-- "aaaaaaaaaa"
3 <$ Just 'x'
-- fmap (const 3) Just 'x'
-- Just 3
(\x y z -> x + y + z) <$> (^2) $> 10 $ 3
-- (\x y z -> x + y + z) . (^2) $> 10 $ 3
-- fmap (const 10) (\x y z -> x + y + z)
-- 即 Reader 函子，仍需接收一个参数才能做计算？？
-- 10

(*>) :: Applicative f => f a -> f b -> f b
a *> b = (id <$ a) <*> b
-- fmap (const id) a <*> b
-- id <*> b

(<*) :: Applicative f => f a -> f b -> f a
(<*) = flip (*>)
-- flip fmap (const id) a <*> b
-- fmap (const id) b <*> a
-- id <*> a

infixl 4 <*, *>

(\x y z -> x + y + z) <$> (^2) <*> (^2) *> (+10) $ 3
-- f *> (+10) $ 3
-- 13
((\x y z -> x + y + z) <$> (^2) <*> (^2) <* (+10)) 3 2
-- (\x -> \y z -> x ^ 2 + y + z) <*> (^2)
-- (\r -> (\y z -> r ^ 2 + y + z) (r ^ 2))
-- (\r -> \z -> r ^ 2 + r ^ 2 + z)
-- 20
replicate <$> Just 1 *> Just (+1) <*> Just 1234
-- f *> Just (+1) <*> Just 1234
-- Just 1235
replicate <$> Just 2 <* Just (+1) <*> Just 1234
-- Just (replicate 2) <*> Just 1234
-- Just [1234, 1234]

-- <* 与 const 的差异
Nothing `const` Just 3
-- Nothing
Just 3 `const` Nothing
-- Just 3
Nothing <* Just 3
-- Nothing
Just 3 <* Nothing
-- Nothing
-- 虽然结果中只包含左侧函子包裹的值，但右侧函子盒子的形状最终决定了结果中函子盒子的形状。
[1..2] <* [1..10]
-- [1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2]

-- 手动升格（显式升格）
liftMaybe2 :: (a -> b -> c) -> Maybe a -> Maybe b -> Maybe c
liftMaybe2 f (Just x) (Just y) = Just $ f x y
liftMaybe2 _ Nothing _ = Nothing
liftMaybe2 _ _ Nothing = Nothing

--
liftA2 :: Applicative f => (a -> b -> c) -> f a -> f b -> f c
liftA2 f x y = fmap f x <*> y

liftA2 replicate (Just 3) (Just 'x')
-- Just "xxx"

-- IO 也是应用函子

