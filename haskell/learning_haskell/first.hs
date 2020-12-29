{-
	以下均为表达式
	1
	True
	1 + 4
	let x = 3 in x * 2
	case Foo of
					True -> 1
					False -> 0
-}

{-
	表示把 = 右边的值 binding 到 = 左边的变量上 （hs中木有变量
	x = 3
	y = 5
-}

fib :: a -> a
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)

fibs :: Num a => a -> [a]
fibs n = take n xs where xs = 1 : 1 : zipWith (+) xs (tail xs)