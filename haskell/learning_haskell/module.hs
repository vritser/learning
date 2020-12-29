import Data.List
import Data.List (nub, sort)
import Data.List hiding (nub)
import qualified Data.Map as M -- M.filter

-- Data.List
intersperse '.' "MONKEY"
intersperse 0 [1..6]
intersperse [0,0,0] [[1..3],[4..6],[7..9]]

transpose [[1..3],[4..6],[7..9]]

concat :: [a] -> [a]

concat ["foo", "bar", "car"]
concat [[3..5],[2..4],[6,5,6]]

concatMap (replicate 4) [1..3]

and $ map (>4) [5..8]
and $ map (==4) [4,4,3,4]

or $ map (==4) [2..6]
or $ map (>4) [1..3]

any (==4) [3..7]
any (`elem` ['A'..'Z']) "HEYGUYSfakje"

all (>4) [6,9,2,8]
all (`elem` ['A'..'Z']) "HELLOavalon"

take 10 $ iterate (*2) 1
take 3 $ iterate (++ "haha") "haha"

sort [7,5,8,2,4,6,3]
sort "hello What's your name"

group [1,1,2,3,4,2,1,1,4,4,3]

--
map (\l@(x:xs) -> (x,length l)) . group . sort $ [1,1,1,3,3,3,2,2,2,2,7,2,2,6,5]

inits "wOOt"
-- ["","w","wO","wOO","wOOt"]

tails "wOOt"
-- ["wOOt","OOt","Ot","t",""]

let w = "wOOt" in zip (inits w) (tails w)
-- [("","w00t"),("w","00t"),("w0","0t"),("w00","t"),("w00t","")]

contains :: (Eq a) => [a] -> [a] -> Bool
contains xs x = 
  let len = length xs
    in foldl (\z y -> if take len y == x then True else False) False (tails xs)

isInfixOf :: (Eq a) => [a] -> [a] -> Bool

isPrefixOf :: (Eq a) => [a] -> [a] -> Bool

isSuffixOf :: (Eq a) => [a] -> [a] -> Bool

partition (`elem` ['A'..'Z']) "BOBsidneyMORGANeddy"
-- ("BOBMORGAN","sidneyeddy")
partition (>3) [1,3,5,6,3,2,1,0,7]
-- ([5,6,7],[1,3,3,2,1,0])
