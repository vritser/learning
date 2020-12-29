module Test where
  main :: IO ()
  main = do
    l <- fmap length getLine
    print l
-- fmap 把 a -> b 的函数编程 f a -> f b 的函数，这个过程叫做升格（lift）
