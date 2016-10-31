import Html exposing (span, text, strong)

main : Html.Html msg
main = span [] [
                 span [] [text "Hello, "],
                 strong [] [text "World!"]
               ]
