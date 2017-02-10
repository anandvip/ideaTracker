/**
 * @a copy of original repo created by https://github.com/seeschweiler/jsissuetracker Written by Sebastian Eschweiler
* @Author: vipul
* @Date:   2017-02-04T13:04:51+05:30
* @Last modified by:   vipul
* @Last modified time: 2017-02-09T23:16:19+05:30
*/

document.getElementById('ideaInputForm').addEventListener('submit', saveidea);

function saveidea(e) {
  var ideaDesc = document.getElementById('ideaDescInput').value;
  var ideaIntensity = document.getElementById('ideaIntensityInput').value;
  var ideaPerspective = document.getElementById('ideaPerspectiveInput').value;
  var ideaId = chance.guid();
  var ideaStatus = 'Idea is in consideration';

  var idea = {
    id: ideaId,
    description: ideaDesc,
    intensity: ideaIntensity,
    perspective: ideaPerspective,
    status: ideaStatus
  };

  if (localStorage.getItem('ideas') === null) {
    var ideas = [];
    ideas.push(idea);
    localStorage.setItem('ideas', JSON.stringify(ideas));
  } else {
     var ideas = JSON.parse(localStorage.getItem('ideas'));
     console.log(ideas);
    ideas.push(idea);
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  document.getElementById('ideaInputForm').reset();

  fetchideas();

  e.preventDefault();
}

function setStatusClosed(id) {
  var ideas = JSON.parse(localStorage.getItem('ideas'));

  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == id) {
      ideas[i].status = 'Idea implimentable';
    }
  }
if(ideas.status === 'Idea implimentable'){
  return  'Idea in Consideration';
}
  localStorage.setItem('ideas', JSON.stringify(ideas));

  fetchideas();
}

function deleteidea(id) {
  var ideas = JSON.parse(localStorage.getItem('ideas'));

  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == id) {
      ideas.splice(i, 1);
    }
  }

  localStorage.setItem('ideas', JSON.stringify(ideas));

  fetchideas();
}

function fetchideas() {
  var ideas = JSON.parse(localStorage.getItem('ideas'));
  var ideasListe = document.getElementById('ideasList');

  ideasList.innerHTML = '';

  for (var i = 0; i < ideas.length; i++) {
    var id = ideas[i].id;
    var desc = ideas[i].description;
    var intensity = ideas[i].intensity;
    var perspective = ideas[i].perspective;
    var status = ideas[i].status;

    ideasList.innerHTML +=   '<div class="col-sm-6 col-md-4">'+
'<div class="well">'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p class="sev"><span class="glyphicon glyphicon-time"></span> ' + intensity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + perspective + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning btn-spacerB">Impliment this Idea</a> '+
                              '<a href="#" onclick="deleteidea(\''+id+'\')" class="btn btn-danger btn-spacerB">Drop this Idea</a>'+ '<br>'+ '<sub>Idea ID: ' + id + '</sub>' + '</div>' +
                              '</div>';
  }
}
