-- 透镜组
data Position = Position { posX :: Double, posY :: Double}
p = Position 1 2
p2 = p { posX = 3}

posX :: Position -> Double
posX (Position x _) = x

setPosX :: Double -> Position -> Position
setPosX x' p =  p { posX = x' }

data Line = Line { lineStart :: Position, lineEnd :: Position }

setLineEnd :: Position -> Line -> Line
setLineEnd p l = l { lineEnd = p }

line1 = Line (Position 1 2) (Position 3 4)
-- 把 line1 的终点纵坐标从4改为5
-- 模式匹配
line2 = case line1 of Line p1 (Position x _) -> Line p1 (Position x 5)
-- 记录语法
line2 = line1 { lineEnd = (lineEnd line1) { posY = 5 } }
-- getter and setter
line2 = setLineEnd (setPosY 5 (lineEnd line1)) line1



---------------

type Lens b a = Functor f => (a -> f a) -> b -> f b
-- Lens b a 是一个类型别名，指类型是(a -> f a) -> b -> f b 的函数
-- a 类型是数据中需要操作的那部分的类型，b 类型是数据本身的类型。
-- 对于 Position 类型来说，可以定义两个透镜组：
xLens :: Functor f => (Double -> f Double) -> Position -> f Position
yLens :: Functor f => (Double -> f Double) -> Position -> f Position

xLens f p = fmap (\x' -> p {posX = x'}) $ f (posX p)

xLens (\x -> Just (x+1)) $ Position 3 5
-- Just (Position { posX = 4.0, posY = 5.0 })
xLens (\x -> Nothing) $ Position 3 4
-- Nothing
xLens (\x -> [x+1,x+2,x+3]) $ Position 5 9
-- [ Position { posX = 6.0, posY = 9.0 }
-- , Position { posX = 7.0, posY = 9.0 }
-- , Position { posX = 8.0, posY = 9.0 } ]

-- over function
over :: Lens b a -> (a -> a) -> b -> b
-- 扩展开后：
over :: Functor f => ((a -> f a) -> b -> f b) -> (a -> a) -> b -> b
-- 代入 Identity
over :: ((a -> Identity a) -> b -> Identity b) -> (a -> a) -> b -> b
over lens f x = runIdentity $ lens (Identity . f) x
-- point free
over lens f = runIdentity $ lens (Identity . f)

over xLens (+1) $ Position 3 5
-- Position 4 5

-- set function
set :: Lens b a -> a -> b -> b
set :: Functor f => ((a -> f a) -> b -> f b) -> a -> b -> b
set lens a' x = over lens (\_ -> a') x
-- point free
set lens a' = over lens $ const a'

const :: a -> b -> a
const x _ = x

set xLens 3 $ Position 5 9
-- Position 3 9

-- view function
view :: Lens b a -> b -> a
-- 展开
view :: ((a -> Const a) -> b -> Const b) -> b -> a
view lens x = getConst ((lens Const) x)
-- point free
view lens = getConst . (lens Const)

view xLens $ Position 1 2
-- 1

--

xLens :: Lens Position Double
xLens f p = fmap (\x' -> p {posX = x'}) $ f (posX p)
yLens :: Lens Position Double
yLens f p = fmap (\y' -> p {posY = y'}) $ f (posY p)

startLens :: Lens Line Position
startLens f l = fmap (\s' -> l {lineStart = s'}) $ f (lineStart l)
endLens :: Lens Line Position
endLens f l = fmap (\s' -> l {lineEnd = s'}) $ f (lineEnd l)

-- yLens 的返回值类型与 endLens 的参数类型刚好相同，所以可以使用(.)连接它们:
endLens . yLens :: Functor f => (Double -> f Double) -> Line -> f Line
endLens . yLens :: Lens Line Double

-- 
line1 :: Line
line1 = Line (Position 0 0) (Position 3 4)

set (endLens . yLens) 5 line1
-- Line (Position 0 0) (Position 3 5)

view (endLens . yLens) line1
-- 4

-- 中缀版本
(^.) :: b -> Lens b a -> a
x ^. lens = view lens x
-- point-free
(^.) = flip view

infixl 8 ^.
-- 优先级比组合函数(.)低：infixr 9

line1 ^. endLens . yLens
-- 4

(%~) :: Lens b a -> (a -> a) -> b -> b
lens %~ f x = over lens f x
-- point-free
(%~) = over

infixr 4 %~

line1 & endLens . yLens %~ (^2)
-- Line (Position 0 0) (Position 3 16)

(.~) :: Lens b a -> a -> b -> b
lens .~ a' x = set lens a' x
-- point-free
(.~) = set

infixr 4 .~

line1 & endLens . yLens .~ 10
-- Line (Position 0 0) (Position 3 10)

