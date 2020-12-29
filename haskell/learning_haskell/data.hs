data Position = MakePosition Double Double
-- or
data Position = Position { posX :: Double, posY :: Double }

let p1 = MakePosition 3 4 -- Position 3 4
-- or
let p2 = Position { posY = 6, posX = 7 } -- Position 7 6

let x = (posX p2) -- 7.0

