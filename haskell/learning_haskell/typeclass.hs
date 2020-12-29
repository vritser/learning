-- Minimal complete definition (最小完整定义)

data Position = Cartesian Double Double | Polar Double Double

-- Cartesian 3 4 == Polar 0.9272952180016123 5 ???
-- GHC 拒绝编译 因为数据类型 Position 不是 Eq 的一个实例（instance）
-- 实例声明（instance declaration）Note：实例声明必须匹配所有的情况
instance Eq Position where
  Cartesian x1 y1 == Cartesian x2 y2 = (x1 == x2) && (y1 == y2)
  Polar x1 y1 == Polar x2 y2         = (x1 == x2) && (y1 == y2)
  Cartesian x y == Polar a r         = (x == r * cos a) && (y == r * sin a)
  Polar a r == Cartesian x y         = (x == r * cos a) && (y == r * sin a)
-- instance 用来宣告某个类型属于某个类型类 需要满足一定的要求：
-- 让 a 成为 Eq 必须提供类型为 a -> a -> Bool 的函数 ==
