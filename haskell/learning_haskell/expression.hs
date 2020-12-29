-- let [bindings] in [expressions] 可随处安放
cylinder :: (RealFloat a) => a -> a -> a
cylinder r h =
  let sideArea = 2 * pi * r * h
      topArea = pi * r ^ 2
  in  sideArea + 2 * topArea

4 * (let a = 9 in a + a) + 2
4 * (if 10 > 5 then 2 else 8) + 5

-- define local function
[let square x = x * x in (square 5, square 3, square 2)]

-- Bind multiple names
(let a = 100; b = 200; c = 300 in a * b * c,let foo = "Hello "; bar = "World" in foo ++ bar)

-- Use pattern matching in let expression
(let (a, b, c) = (1,2,3) in a + b + c) * 10

calcBmis :: (RealFloat a) => [(a,a)] -> [a]
calcBmis xs = [bmi | (w, h) <- xs, let bmi = w / h ^ 2]
-- Use let do filter
calcBmis xs = [bmi | (w, h) <- xs, let bmi = w / h ^ 2, bmi >= 25.0]
-- or
calcBmis [] = []
calcBmis ((w, h):xs) = bmi : calcBmis xs
  where bmi = w / h ^ 2
-- or
calcBmis xs = [bmi w h | (w, h) <- xs]
  where bmi = weight / height ^ 2

-- Guards with Where
bmiTell :: (RealFloat a) => a -> String
bmiTell weight height 
  | bmi <= skinny = "You're underweight, you emo, you!"
  | bmi <= normal = "You're supposedly normal."
  | bmi <= fat = "You're fat! Lost some weight, fatty!"
  | otherwise   = " You're whale, congratulations!"
  where bmi = weight / height ^ 2
        (skinny, normal, fat) = (18.5, 25.0, 30.0)

-- Case expressions
describeList :: [a] -> String
describeList xs = "This list is " ++ case xs of [] -> "empty."
                                                [x] -> "a singleton list."           
                                                xs -> "a longger list."
-- or
describeList xs = "This list is " ++ what xs
  where what [] = "empty."
        what [x] = "a singleton list."
        what xs = "a longger list."
