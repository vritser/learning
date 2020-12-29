-- 枚举类
succ :: Enum a => a -> a
succ 2 -- 3
succ 'a' -- 'b'

pred :: Enum a => a -> a
pred 1 -- 0
pred 'z' -- 'y'

-- 返回枚举中对应次序的元素
toEnum :: Enum a => Int -> a
toEnum 65 :: Char -- 'A'
toEnum 97 :: Char -- 'a'

-- 返回元素在枚举中的次序
fromEnum :: Enum a => a -> Int
fromEnum 'b' -- 98
fromEnum 'l' -- 108

enumFrom :: Enum a => a -> [a] -- == [n..]
enumFrom 3 -- [3,4,5...]

enumFromThen :: Enum a => a -> a -> [a] -- == [m,n..]
enumFromThen 3 2 -- [3,2,1...]

enumFromTo :: Enum a => a -> a -> [a] -- == [m..n]
enumFromTo 1 10 -- [1,2,3...10]

enumFromThenTo :: Enum a => a -> a -> a -> [a] -- == [m,n..l]
enumFromThenTo 10 9 4 -- [10,9,8..4]

-- Enum 的推导规则：构造函数不需要参数的数据类型
data Pet = Dog | Cat | Bird | Turtle deriving (Enum,Show)

show Dog -- "Dog"
succ Cat -- Bird
fromEnum Dog -- 0
toEnum 3 -- Turtle


-- 边界类
class Bounded a where
  minBound, maxBound :: a
minBound :: Char
-- '\NUL'
maxBound :: Char
-- '\1114111'
minBound :: Int
-- -9233...


-- 数字类（Num）
-- 整数的表示有两种：Int 和 Integer。前者是固定字节表示，有大小限制的整数；后者是使用
-- 大数处理算法表示的整数，上下限只受机器内存限制。处理速度上 Int > Integer,在满足计算
-- 要求的情况下，添加 Int 类型说明以优化计算速度


