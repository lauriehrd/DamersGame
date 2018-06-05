document.addEventListener("DOMContentLoaded", function() {

  var user_id = null;

      // $(".button-collapse").sideNav();
      // $(".accueil").hide();

var navBarNone = function(){

  function resetNavBar(){

    // var tabNone = [$("#inscription"), $("#connexion"), $("#jouer"), $("p-vs-p"), $("p-vs-c")]

    // for (var i = 0; i < tabNone; i++){
    //
    //   if (tabNone[i].hasClass('d-none'))
    //     tabNone[i].addClass('d-none');
    //     }

    $("#profil").addClass('d-none');
    $("#vueProfil").addClass('d-none');
    $("#jouer").addClass('d-none');
    $("#pro").addClass('d-none');

    $('#accueil').addClass('d-none');

  }

  $("#btnHome").click(function(){
    resetNavBar();
    $('#accueil').removeClass('d-none');
  });

  // $('#btnInscription').click(function(){
  //   console.log('ok');
  //   resetNavBar();
  //   $('#profil').removeClass('d-none');

  // });

    $('#btnInscription').click(function(){
    resetNavBar();
    $('#pro').removeClass('d-none');

  });

  //  $('#fermer_inscription').click(function(){
  //   resetNavBar();
  // });

  $('#btnConnexion').click(function(){
    resetNavBar();
    $('#vueProfil').removeClass('d-none');

  });

  //  $('#fermer_connexion').click(function(){
  //   resetNavBar();
  // });

  $('#btnJouer').click(function(){
    resetNavBar();
    $('#accueil').addClass('d-none');
    $('#jouer').removeClass('d-none');
  });

}();

  $('#envoyer_inscription').click(function(){

    const nomI = document.getElementById('nom_inscription').value;
    const pseudoI = document.getElementById('pseudo_inscription').value;
    const mailI = document.getElementById('mail_inscription').value;
    const mdpI = document.getElementById('mdp_inscription').value;

    if (!nomI){
      alert("Champs du nom vide");
      return;

    }

    if (!pseudoI){
      alert("Champs du pseudo vide");
      return;
    }

    if (!mailI){
      alert("Champs du mail vide");
      return;
    }

    if (!mdpI){
      alert("Champs du mdp vide");
      return;
    }

    axios.post('http://51.15.213.4:5001/api/register/', {

    "first_name":nomI.trim(),
    "last_name":pseudoI.trim(),
    "email":mailI.trim(),
    "password":mdpI.trim()

    }).then(function (response) {
      console.log(response);
      alert("Inscription faites");

      axios.post('http://51.15.213.4:5001/api/login', {

      email: mailI.trim(),
      password: mdpI.trim()


    }).then(function (response2) {

      console.log(response2);

      user_id = response2.data.id;
      sessionStorage.setItem('user_id', user_id);
      console.log('sessions Storage = ' + sessionStorage.getItem('user_id'));

    }).catch(function (error2) {

      console.log("erreur connexion");
      console.log(error2);

    });
      
      $('#pro').addClass('d-none');
      $('#jouer').removeClass('d-none');
      $('#slide-out').addClass("is-active");


    
    }).catch(function (error) {
      console.log(error);
      alert("Une erreur c'est produite lors de l'inscription");
    });
  });

  $('#envoyer_connexion').click(function(){

    const mailC = document.getElementById('mail_connexion').value;
    const mdpC = document.getElementById('mdp_connexion').value;
    // console.log(document.getElementById('nom').value);
    // console.log(document.querySelector('#email').value);
    // console.log($('#password').value);

    if (!mailC){
      alert("Champs du mail vide");
      return;
    }

    if (!mdpC){
      alert("Champs du mdp vide");
      return;
    }


    axios.post('http://51.15.213.4:5001/api/login', {

      email: mailC.trim(),
      password: mdpC.trim()


    }).then(function (response) {

      console.log(response);
      if(response.data.code == 404){
      alert("Email incorrect");

      }else if(response.data.code == 401){
      alert("Mot de passe incorrect");

      }else {
      alert("Connexion établie");
      user_id = response.data.id;
      sessionStorage.setItem('user_id', user_id);

      $('#vueProfil').addClass('d-none');
      $('#jouer').removeClass('d-none');
      $('#slide-out').addClass("is-active");
    
      }


    }).catch(function (error) {

      console.log(error);
      console.log("erreur connexion");

    });



  });

$('#envoyer_save').click(function(){

    const id = sessionStorage.getItem('user_id');
    const data = $("#board").html();



    if (!id){
      alert("Tu n'est pas connecté");
      return;

    }

    axios.post('http://51.15.213.4:5001/api/save/', {

    user_id: id,
    data: data

    }).then(function (response) {
      console.log(response);
      alert("Sauvegarde faites");      
    
    }).catch(function (error) {
      console.log(error);
      alert("Une erreur c'est produite lors de la sauvegarde");
    });
  });

$('#envoyer_reprendre').click(function(){

    const id = sessionStorage.getItem('user_id');

    if (!id){
      alert("Tu n'est pas connecté");
      return;

    }

    axios.post('http://51.15.213.4:5001/api/reprendre/', {

    user_id: id,

    }).then(function (response) {
      console.log(response.data.data);
      $("#board").html(response.data.data);

      alert("Sauvegarde reprise");      
    
    }).catch(function (error) {
      console.log(error);
      alert("Une erreur c'est produite lors de la récupération");
    });
  });


});
