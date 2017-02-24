<?php

class MastermindController extends Controller
{

    public function index()
    {
        // $deck = MastermindModel::getDeck();
        $this->View->render('mastermind/index', array(
                // 'users' => GameModel::getScore(),
                // 'deck' => $deck,
                // 'card' => GameModel::getCard()
        ));
    }
}
