
map :: (a -> b) -> [a] -> [b]
map _ [] = []
map f (x:xs) = f x : map f xs
map (*2) [1..10]

filter :: (a -> Bool) -> [a] -> [a]
filter _ [] = []
filter f (x:xs)
  | f x == True  = x : filter f xs
  | otherwise    = filter f xs
{- 
  filter f (x:xs) =
    if f x then x : filter f xs
           else filter f xs
-}
qs :: (Ord a) => [a] -> [a]
qs [] = []
qs (x:xs) = smaller ++ [x] ++ larger
  where smaller = qs $ filter (<x) xs
        larger = qs $ filter (>=x) xs

filter (\x -> x `rem` 2 == 0) [0..100]
giveMeFive :: [a] -> [a]
giveMeFive xs = map snd $ filter (\(i,x) -> i `rem` 5 == 0) $ zip [0..] xs

-- 
foldl :: (b -> a -> b) -> b -> [a] -> b
foldl _ acc [] = acc
foldl f acc (x:xs) = foldl f (f acc x) xs
foldl (+) 0 [1..10]

elem :: (Eq a) => a -> [a] -> Bool
elem y = foldl (\acc x -> if x==y then True else acc) False

foldr :: (b -> a -> b) -> b -> [a] -> b
foldr _ acc [] = acc
foldr f acc (x:xs) = f x (foldr f acc xs)
foldr (+) 0 [1..10]

map :: (a -> b) -> [a] -> [b]
map f = foldr ((:) . f) []
-- ++ 比 ：效率低
map f = foldl (\acc x -> acc ++ [f x]) []

flip :: (a -> b -> c) -> b -> a -> c
flip f y x = f x y
-- or
flip f = \x y -> f y x

-- 右结合 优先级 0
($) :: (a -> b) -> a -> b
f $ x = f x
infixr 0 $
f (g (k x)) == f $ g $ k x

(&) :: a -> (a -> b) -> b
x & f = f x
infixl 1 &
3 & (+1) & (2^) -- 16

-- compose function
(.) :: (b -> c) -> (a -> b) -> a -> c
f . g = \x -> f (g x)
infixr 9 .
toEnum . (+1) . fromEnum $ 'a' :: Char
-- 'b'

{-
  exercise
  pro :: (Num a,Enum a) => [a -> a]
  pro = map (*) [1..]
  -- [(*0),(*1),(*2),(*3)...]
  pro !! 0 $ 5 -- 0
-} 

maximum :: (Ord a) => [a] -> a
maximum = foldr1 max

reverse :: [a] -> [a]
reverse = foldl (flip (:)) []
reverse = foldr (\x acc -> acc ++ [x]) []

product :: (Num a) => [a] -> a
product = foldl1 (*)
product = foldr1 (*)

filter :: (a -> Bool) -> [a] -> [a]
filter f = foldr (\x acc -> if f x then x : acc else acc) []

head :: [a] -> a
head = foldr1 (\x _ -> x)
head = foldl1 (\acc _ -> acc)

last :: [a] -> a
last = foldl1 (\_ x -> x)
last = foldr1 (\_ acc -> acc)

scanl :: (b -> a -> b) -> b -> [a] -> [b]
scanl _ acc [] = acc : []
scanl f acc (x:xs) = (acc : scanl f (f acc x) xs)

scanr :: (b -> a -> b) -> b -> [a] -> [b]
scanr _ q0 []           =  [q0]
scanr f q0 (x:xs)       =  f x q : qs
                           where qs@(q:_) = scanr f q0 xs
-- 
foldr _ z [] = [z]
foldr f z (x:xs) = f x (foldr f z xs)

concat :: Foldable t => t [a] -> [a]
concat [] = []
concat (x:xs) = x ++ concat xs
