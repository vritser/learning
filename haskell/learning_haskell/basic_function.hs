-- All must be non-empty

fst :: (a,b) -> a  -- 提取双元组第一个元素
fst (a,b) = a
fst ("hello",100) -- "hello"

snd :: (a,b) -> b  -- 提取双元组第二个元素
snd (a,b) -> b
snd ("hello",100) -- 100

(++) :: [a] -> [a] -> [a]  -- 连接两个相同类型的列表
(++) [] ys = ys
(++) (x:xs) ys = x : xs ++ ys
[1,2,3] ++ [4,5] -- [1,2,3,4,5]

(!!) :: [a] -> Int -> a  -- 取列表第n个元素 从0开始
(x:xs) !! 0 = x
(x:xs) !! n = xs !! (n - 1)
[1,2,3] !! 0 -- 1
[4,3,6] !! 2 -- 6

-- 取列表的头和尾
head :: [a] -> a
head (x:xs) = x
-- or
head xs = case xs of [] -> error "No head for empty list!"
                     (x:_) -> x
head [1,2,3] -- 1
tail :: [a] -> [a]
tail (x:xs) = xs
tail [1,2,3] -- [2,3]

-- 取列表的始和末
init :: [a] -> [a]
init [x] = []
init (x:xs) = x : init xs

last :: [a] -> a 
last [x] = x
last (_:xs) = last xs
init [1,2,3] -- [1,2]
last [1,2,3] -- 3

null :: [a] -> Bool -- 判断列表是否为空列表
null [] = True
null [_] = False -- null [_:_] = False
null [1,2]  -- False

length :: [a] -> Int -- 求列表长度
length [] = 0
length (_:xs) = 1 + length xs
length "hello world" -- 11

take :: Int -> [a] -> [a] -- 取列表前n个元素
take 0 _ = []
take _ [] = []
take n (x:xs) = x : take (n-1) xs

drop :: Int -> [a] -> [a]
drop _ [] = []
drop 0 xs = xs
drop n (_:xs) = drop (n-1) xs

-- 
reverse :: [a] -> [a]
reverse [] = []
reverse (x:xs) = reverse xs ++ [x]
reverse [1,2,3] -- [3,2,1]

giveMeFive :: [a] -> [a]
giveMeFive xs = giveMeFiveHelper 0 xs

giveMeFiveHelper :: Int -> [a] -> [a]
giveMeFiveHelper _ [] = []
giveMeFiveHelper i (x:xs) =
	if i `rem` 5 == 0  then x : giveMeFiveHelper (i+1) xs
	   else giveMeFiveHelper (i+1) xs

-- 拉链
zip :: [a] -> [b] -> [(a,b)]
zip [] _ = []
zip _ [] = []
zip (x:xs) (y:ys) = (x,y) : zip xs ys
zip [0..] ["hello","world"] -- [(0,"hello"),(1,"world")]

giveMeFive :: [a] -> [a]
giveMeFive [] = []
giveMeFive ((i,x):xs) = 
	if i `rem` 5 == 0 then x : giveMeFive xs
		else giveMeFive xs

max :: a -> a -> a
max a b -> if a > b then a
      	   else b
-- or           
max a b 
  | a > b     = a
  | otherwise = b

	   
maximum :: [a] -> a
maximum [] = error "empty list"
maximum [x] = x
maximum (x:xs) = max x $ maximum xs
-- or
maximum = flodr1 max

repeat :: a -> [a]
repeat x = x : repeat x

replicate :: Int -> a -> [a]
replicate 0 _ = []
replicate n x = x : replicate (n-1) x
-- another implements 
replicate' n x 
  | n <= 0    = []
  | otherwise = x : replicate' (n-1) x

zip :: [a] -> [b] -> [c]
zip [] _ = []
zip _ [] = []
zip (x:xs) (y:ys) = (x,y) : zip xs ys

zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith _ [] _ = []
zipWith _ _ [] = []
zipWith f (x:xs) (y:ys) = f x y : zipWith f xs ys

elem :: (Eq a) => [a] -> Bool
elem a [] = False
elem a (x:xs)
     | a == x    = True
     | otherwise = a `elem` xs

quickSort :: (Ord a) => [a] -> [a]
quickSort [] = []
quickSort (x:xs) =
  let smaller = quickSort [a | a <- xs, a <= x]
      bigger = quickSort [a | a <- xs, a > x]
  in smaller ++ [x] ++ bigger

qs [] = []
qs (x:xs) = smaller ++ [x] ++ bigger
  where smaller = qs [a | a <- xs, a <= x]
        bigger = qs [a | a <- xs, a > x]

chain :: (Integral a) => a -> [a]
chain 1 = [1]
chain x = 
    | even n = n : chain (n `div` 2)
    | odd n = n : chain (n * 3 + 1)

longChains :: Num
longChains = fromInterval $ length $ filter (\x -> length x > 15) $ map chain [1..100]
