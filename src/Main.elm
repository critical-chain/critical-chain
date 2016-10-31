import Html.App as App
import Html exposing (..)
import Html.Attributes exposing (href, class, style)

import Material
import Material.Scheme
import Material.Button as Button
import Material.Elevation as Elevation
import Material.Textfield as Textfield
import Material.List as Lists
import Material.Options exposing (css)

import Uuid exposing (Uuid)

-- MODEL

type alias EstimationStep =
  { id : Maybe Uuid
  , title : String
  , position : Float
  , value : Float
  , quantity : Int
  , precise : Bool
  }

type alias Estimation =
  { id : Maybe Uuid
  , title : String
  , steps : List EstimationStep
  }

new_estimation : String -> Estimation
new_estimation new_title =
  { id = Uuid.fromString "6277805e-63c9-4486-9b2a-1579d13120e6"
  , title = new_title
  , steps = []
  }

type alias Model =
  { estimations : List Estimation
  , estimationTitleInput : String
  , mdl : Material.Model
      -- Boilerplate: model store for any and all Mdl components you use.
  }


model : Model
model =
  { estimations = []
  , estimationTitleInput = ""
  , mdl = Material.model
      -- Boilerplate: Always use this initial Mdl model store.
  }


-- ACTION, UPDATE


type Msg
  = CreateEstimation
  | ChangeEstimationTitleInput String
  | Mdl (Material.Msg Msg)
      -- Boilerplate: Msg clause for internal Mdl messages.


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    CreateEstimation ->
      ( { model | estimations = model.estimations ++ [new_estimation model.estimationTitleInput], estimationTitleInput = "" }
      , Cmd.none
      )

    ChangeEstimationTitleInput new_title ->
      ( { model | estimationTitleInput = new_title }
      , Cmd.none
      )

    -- Boilerplate: Mdl action handler.
    Mdl msg' ->
      Material.update msg' model


-- VIEW


type alias Mdl =
  Material.Model

render_estimation_row : Estimation -> Html.Html m
render_estimation_row estimation =
  Lists.li [] [ Lists.content [] [ text estimation.title ] ]


view : Model -> Html Msg
view model =
  div
    [ style [ ("padding", "2rem") ] ]
    [ Lists.ul [Elevation.e6] (List.map render_estimation_row model.estimations)
    , Textfield.render Mdl [0] model.mdl
        [ Textfield.onInput ChangeEstimationTitleInput
        , Textfield.value model.estimationTitleInput
        ]

    , Button.render Mdl [0] model.mdl
        [ Button.icon
        , Button.ripple
        , Button.colored
        , Button.raised
        , Button.onClick CreateEstimation
        , css "margin-left" "1.2rem"
        ]
        [ text "+" ]
    ]
  |> Material.Scheme.top
      -- Load Google Mdl CSS. You'll likely want to do that not in code as we
      -- do here, but rather in your master .html file. See the documentation
      -- for the `Material` module for details.


main : Program Never
main =
  App.program
    { init = ( model, Cmd.none )
    , view = view
    , subscriptions = always Sub.none
    , update = update
    }
