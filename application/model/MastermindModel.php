<?php

class MastermindModel
{

    public function __construct()
    {
        Session::init();
    }

    public static function getScore()
    {
        // $database = DatabaseFactory::getFactory()->getConnection();
        // $user_id     = Session::get('user_id');
        // $sql = "SELECT user_name, points FROM users
        // WHERE user_id = $user_id ";
        // $query = $database->prepare($sql);
        // $query->execute();
        //
        // return $query->fetchAll();
    }
}
