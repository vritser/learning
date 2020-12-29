-- type 不会定义新的数据类型，只是给原有的数据类型起个新的名字（别名 alias
type List a = [a] -- [1,2,3] :: List Int
type IntList = [Int]

xs = [1,2,3] :: IntList
maximum xs
-- 3s
type ShowS = String -> String
ShowPrec :: Int -> a -> ShowS

-- 以下定义的值完全相等
[1,2,3] :: [Int]
[1,2,3] :: List Int
[1,2,3] :: IntList
