-- module Kata where
import Data.List
import Data.Char

isSortedAndHow :: [Int] -> String
isSortedAndHow xs
    | GT `notElem` cs = "yes, ascending"
    | LT `notElem` cs = "yes, descending"
    | otherwise              = "no"
    where cs = zipWith compare xs (tail xs)

-- isSortedAndHow xs
--   | and $ zipWith (>=) xs (tail xs) = "yes ascending"
--   | and $ zipWith (<=) xs (tail xs) = "yes descending"
--   | otherwise                       = "no"

-- isSortedAndHow xs
--   | sort xs == xs         = "yes ascending"
--   | reverse (sort xs) == xs = "yes descending"
--   | otherwise             = "no"

spinWords :: String -> String
spinWords = unwords . map (\s -> if length s < 5 then s else reverse s) . words

maskify :: String -> String
maskify s = replicate l '#' ++ drop l s
  where l = length s

maskify s
  | length s < 5 = s
  | otherwise    = "#" ++ maskify(tail s)

capitals :: String -> [Int]
capitals s = [i | (i,c) <- zip [0..] s, isUpper c]
-- or
-- capitals = findIndices isUpper

-- take 5 $ scanl (\acc _ -> acc * acc) 2 [1..]
-- [2, 4, 16, 256, 65536]



-- calc :: (Char,Int,Int) -> Int
-- calc (op, a, b) = 
--   case op of '+' ->


-- 八皇后问题

safe :: Int -> [Int] -> Int -> Bool
-- 第一个参数是新的横坐标
-- 第二个参数是前 m 行的摆放方案
-- 第三个参数是递归时的循环变量，用来表示判断到了前 m 行的第几行

-- 第一次摆放，之前的方案是空列表，怎么摆放都可以
safe _ [] _ = True
-- 接下来从前 m 行的最上面一行开始判断，即 n 从1开始
safe x (x1:xs) n =
  -- 是否在同一列上？
  x /= x1
  -- 是否在同一条斜线上？
  && x /= x1 + n && x /= x1 -no
  -- 和前 m-1 行的皇后一起是否安全？
  && safe x xs (n+1)

queens :: Int -> [[Int]]
queens 0 = [[]]
queens n = [x : y | y <- queens (n-1), x <- [1..8], safe x y 1]

queensN :: Int -> [[Int]]
queensN n = queens n
  where 
    queens 0 = [[]]
    queens m = [x : y | y <- queens(m-1), x <- [1..n], safe x y 1]
