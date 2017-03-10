        <div class="footer"></div>
    </div><!-- close class="wrapper" -->

     <?php if (View::checkForActiveController($filename, "mastermind")) {?>
         <script src="<?php echo Config::get('URL'); ?>js/script.js"> </script>
     <?php } ?> 



</body>
</html>
