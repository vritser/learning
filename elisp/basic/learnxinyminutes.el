(progn
(switch-to-buffer-other-window "*test*")
(erase-buffer)
(hello " world")
(other-window 1))

(let ((local-name "you"))
(switch-to-buffer-other-window "*test*")
(erase-buffer)
(hello " world")
(other-window 1))

(format "Hello %s!\n" "world")

(defun hello (name)
  (insert (format ("Hello %s!\n") name)))

(hello "hisn")

(defun greeting (name)
  (let ((your-name (read-from-minibuffer "enter your name:")))
    (switch-to-buffer-other-window "*test*")
    (erase-buffer)
    (insert (format "Hello %s!\n\nI am %s." name your-name))
    (other-window 1)))

(greeting "hisn")

(read-from-minibuffer "enter your name:")

(setq names '("java" "c#" "haskell" "elisp"))

(car names)
(cdr names)

(push "go" names)

(mapcar 'hello names)

(defun replace-hello-by-bonjour ()
  (switch-to-buffer-other-window "*test*")
  (goto-char (point-min))
  (while (search-forward "Hello" (point-max) t)
    (replace-match "Bonjour"))
  (other-window 1))

(replace-hello-by-bonjour)



(defun boldify-names ()
  (switch-to-buffer-other-window "*test*")
  (goto-char (point-min))
  (while (re-search-forward "Bonjour \\(.+\\)!" nil t)
    (add-text-properties (match-beginning 1)
                         (match-end 1)
                         (list 'face 'bold)))
  (other-window 1))

(boldify-names)

(defun insert-comma-at-the-end-of-line ()
  (interactive)
  (save-excursion
    (end-of-line)
    (insert ",")))

(defun delete-comma-at-the-end-of-line ()
  (interactive)
  (save-excursion
    (end-of-line)
    (if (looking-back ",")
        (progn
          (backward-char)
          (delete-char 1)))))

;; test delete comma function

