join :: Maybe (Maybe a) -> Maybe a
join (Just x) = x
join Nothing = Nothing

join :: [[a]] -> [a]
join = concat

class Monad m where
  return :: a -> m a
  return = pure

  join :: m (m a) -> m a

  (>>=) :: m a -> (a -> m b) -> m b
  x >>= f = join $ fmap f x
-- f :: a -> m b 经过 fmap 升格后得到：fmap f :: m a -> m (m b),把 m a 类型的参数交给 fmap f 之后，得到 m (m b) 类型的值
-- 经过 join 合并掉一层函子，得到 m b 类型的结果。


env :: Maybe String -- env <- lookupEnv "PORT"
readMaybe :: String -> Maybe Int
port  = fmap readMaybe env :: Maybe (Maybe Int)
withPort :: Int -> []
fmap (fmap withPort) port

fmap :: Monad m => (a -> b) -> m a -> m b
fmap f ma = ma >>= return . f

instance Monad Maybe where
  return :: a -> Maybe a
  return = Just

  (>>=) :: Maybe a -> (a -> Maybe b) -> Maybe b
  ma >>= f = case ma of Just a -> f a
                        Nothing -> Nothing

  env >>= readMaybe :: Maybe Int
  env >>= readMaybe >>= withPort

  env >>= \e ->
      readMaybe e >>= \p ->
        return (p + 1)
  -- do 语法糖
  (do
    e <- env
    p <- readMaybe e
    return (p + 1)
  ) :: Maybe Int

instance Monad [] where
  return :: a -> [a]
  return x = [x]

  (>>=) :: [a] -> (a -> [b]) -> [b]
  x >>= f = mconcat $ f <$> x

  [1..3] >>= \ x ->
    [4..6] >>= \ y ->
      [x, y]
  do
    x <- [1..3]
    y <- [4..6]
    [x, y]

-- [1,4,1,5,1,6,2,4,2,5,2,6,3,4,3,5,3,6]

-- Monad 定律
-- 左单位元： return a >>= f ≡ f a
-- 右单位元： m >>= return ≡ m
-- 结合律： (m >>= f) >>= g ≡ m >>= (\x -> f x >>= g)

instance Monad ((->) r) where
  return :: a -> r -> a
  return = const

  (>>=) :: (r -> a) -> (a -> r -> b) -> r -> b
  fa >>= fb = \r -> fb (fa r) r

(+2) >>= (*) == \x -> (*) ((+2) x) x
-- 左单位元
return 1 >>= (+) == \x -> (+) (const 1 x) x
                 == \x -> (+) 1 x
                 == (+1)
-- 右单位元
(+1) >>= return  == (+1) >>= \x -> const x
                 == \x -> const (x + 1) x
                 == \x -> (x + 1)
                 == (+1)
-- 结合律
(+1) >>= (*) >>= (^) == \x -> (*) (x + 1) x >>= (^)
                     == \x -> ((1 + x) * x) ^ x

(+1) >>= (\x -> (x*) >>= (^)) == (+1) >>= (\x -> \y -> (x * y) ^ y)
                              == (\y -> ((y + 1) * y) ^ 2)

Just 3 >>= (\n -> Just 'x' >>= (\x -> return $ replicate n x))
-- or
do
  n <- Just 3
  x <- Just 'x'
  return $ replicate n x

(>>) :: Monad m => m a -> m b -> m b
ma >> mb = ma >>= \_ -> mb >>= \b -> return b

sum $ [1..10] >>= \x -> [x..10] >> [1]
-- 55
