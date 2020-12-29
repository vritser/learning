;; Chapter5. Lisp Files

;; 1. Creating a Lisp File
;; Create timestamp.el

;; 2. Loading the File
;; Finding Lisp Files
;; Emacs find it among the directories in the load path.
;; Add a directory to the beginning of load-path
(setq load-path
      (cons "~/github/Writing-GNU-Emacs-Extensions/"
            load-path))
;; Add a directory to the end
(setq load-path
      (append load-path
              ;; a quoted list
              '("~/github/Writing-GNU-Emacs-Extensions/")))

(load-file "timestamp.el")
(require 'timestamp)
(autoload 'insert-date "timestamp"
  "Insert the current time according to insert-time-format."
  t)

;; 3. Compiling the File

;; From within Emacs:
;; M-x byte-compile-file RET file.el RET.
;; From the UNIX shell:
;; emacs -batch -f batch-byte-compile file.el.

;; 4. eval-after-load

;; If you'd like to defer the execution of some code until a particular file has been loaded,
;; eval-after-load is the way to do it.

(eval-after-load 'timestamp
  (message "eval after timestamp"))

;; 5. Local Variables Lists

                                        ; Local variables:
                                        ; foo: (+ 3 5)
                                        ; eval: (add-hook 'local-write-file-hook 'update-writestamps)
                                        ; End:

;; 6. Security Consideration

(setq enable-local-variables 'query)

(setq enable-local-eval nil)
