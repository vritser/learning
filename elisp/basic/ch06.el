;; Chapter 6. Lists

;; 1. The Simple View of Lists
(a b c)                                 ; list of three symbols
(7 "foo")                               ; list of number and string
((4.12 31178))                          ; list of one element: a sublist of two numbers
()                                      ; empty list () is synonymous with the symbol nil

(car '(a b c))                          ; => a
(cdr '(a b c))                          ; => (b c)
(car (cdr '(a b c)))                    ; => b

;; The cdr of a one-element list is nil:
(cdr '(x))                              ; => nil

;; The car and cdr of the empty list are both nil:
(car '())                               ; => nil
(cdr '())                               ; => nil

;; This is also true of the list containing nil:
(car '(nil))                            ; => nil
(cdr '(nil))                            ; => nil

;; This does not mean that () is the same as (nil)

(list 'a "b" 7)
(list '(x y z) 3)

;; cons create a new list without affecting the old list
(cons 'a '(3 4 5))                      ; => (a 3 4 5)
(cons "hello" '())                      ; => ("hello")
(cons '(a b) '(c d))                    ; => ((a b) c d)
;; dot pair
(cons 'a 'b)                            ; => (a . b)

;; The function append takes any number of lists and makes a new list by
;; concatenating the top-level elements of all the lists
(append '(a b) '(c d))                  ; => (a b c d)
(append '(a (b c) d) '(e (f)))          ; => (a (b c) d e (f))

;; The function reverse takes a list and makes a new list by reversing
;; its top-level elements. Note: Does not reverse elements in sublist
(reverse '(a b c))                      ; => (c b a)
(reverse '(1 2 (3 4) 5 6))              ; => (6 5 (3 4) 2 1)

;; 2. List Details

;; consp tests whether its argument is a cons cell. (consp x) is true when x is any list
;; except the empty list, and false for all other objects.
(consp '())                             ; nil
(consp nil)                             ; nil
(consp 1)                               ; nil
(consp '(1))                            ; t

;; atom tests whether its argument is atomic. (atom x) is the opposite of (consp x) - everything
;; that's not a cons cell, including nil, numbers, strings, and symbols, is an atom.
(atom '())                              ; t
(atom '(1 2 3))                         ; nil
(atom 2)                                ; t
(atom 'b)                               ; t

;; listp tests whether its argument is a list. (listp x) is true for all cons cells and for nil,
;; false for everything else.
(listp '())                             ; t
(listp '(1 2 3))                        ; t
(listp nil)                             ; t
(listp 3)                               ; nil

;; null tests whether its argument is nil.
(null '())                              ; t
(null 3)                                ; nil
(null nil)                              ; t
(null "")                               ; nil

;; 3. Recursive List Functions
(defun flatten (xs)
  ""
  (if (null xs)
      nil
    (if (listp (car xs))
        (append (flatten (car xs))
                (flatten (cdr xs)))
      (cons (car xs)
            (flatten (cdr xs))))))

;; 4. Iterative List Functions

(defun count-syms (xs)
  (if (null xs)
      0
    (if (symbolp (car xs))
        (+ 1 (count-syms (cdr xs)))
      (count-syms (cdr xs)))))

(defun count-syms (xs)
  (let ((cnt 0))
    (while xs
      (if (symbolp (car xs))
          (setq cnt (+ 1 cnt)))
      (setq xs (cdr xs)))
    cnt))

;; 5. Other Useful List Functions

;; length returns the length of a list. It does not work on "improper" lists.
(length nil)                            ; => 0
(length '(x y z))                       ; => 3
(length '((x y z)))                     ; => 1
(length '(a b . c))                     ; => error

;; nthcdr calls cdr on a list n times.
(nthcdr 2 '(a b c))                     ; => (c)

;; nth returns the nth element of a list(where the first element is numbered zero).
;; This is the same as the car of the nthcdr.
(nth 2 '(a b c))                        ; => c
(nth 1 '((a b) (c d) (e f)))            ; => (c d)

;; mapcar takes a function and a list as arguments. It calls the function once for each element of
;; the list, passing that element as an argument to the function.
(mapcar 'capitalize
        '("lisp" "is" "cool"))
;; => ("Lisp" "Is" "Cool")

;; equal tests whether its two arguments are equal.
;; eq tests whether its arguments are the same object, and eq is an instantaneous operation.
;; equal tests whether two objects have the same structure and contents, may have to recursively
;; compare the structure of its two arguments.
(setq x (list 1 2 3))
(setq y (list 1 2 3))

(eq x y)                                ; => nil
(equal x y)                             ; => t

;; assoc is a function that helps you use lists as lookup tables.
;; It use equal to test whether each key matches the argument you give.
(setq colors '((red . "ff0000")
               (green . "00ff00")
               (blue . "0000ff")))

(assoc 'green colors)                   ; => (green . "00ff00")
(assoc 'yellow colors)                  ; => nil
(cdr (assoc 'green colors))

;; assq is like assoc but uses eq instead.
(assq 'green colors)                    ; => (green . "00ff00")

;; 6. Destructive List Operations

(setq x '(a b c))
(setq y '(d e f))
(setq z '(g h i))

;; create a brand-new list
(append x y z)                          ; => (a b c d e f g h i)

;;
(nconc x y z)                           ; => (a b c d e f g h i)
;; but x and y are changed
;; x => (a b c d e f g h i)
;; y => (d e f g h i)
;; z => (g h i)

;;
(setq e-addrs '(("robin" . "rl@qq.com")
                ("marian" . "mf@qq.com")
                ("john" . "jk@qq.com")))

;; Now suppose someone's email address changes.
(setq e-addrs (alist-replace e-addrs "john" "johnl@163.com"))
(print e-addrs)
(defun alist-replace (alist key new-val)
  (if (null alist)
      nil)
  (if (and (listp (car alist))
           (equal key (car (car alist))))
      (cons (cons key new-val)
            (cdr alist))
    (cons (car alist)
          (alist-replace (cdr alist) key new-val))))

;; setcar and setcdr
(setq x (cons 'a 'b))                   ; => (a . b)
(setcar x 'c)                           ; => (c . b)
(setcdr x 'd)                           ; => (c . d)

(defun alist-replace (alist key val)
  (let ((p (assoc key alist)))
    (if p
        (setcdr p val))))

(alist-replace e-addrs "john" "john@gmail.com")

;; nreverse is a non-copying version of reverse
(setq x '(a b c))
(nreverse x)                            ; => (c b a)
;; x => (a)

;; 7. Circular Lists?!
(setq x '(a b c))
(progn
  (setcdr (nthcdr 2 x) x)
  nil)
(nth 0 x)
(nth 4 x)
(nth 422 x)

(defun index-of (x xs)
  (if (null xs)
      0
    (if (equal x (car xs))
        0
      (+ 1 (index-of x (cdr xs))))))

(index-of 3 '(1 2 3 4 5))
