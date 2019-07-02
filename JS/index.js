function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // './DATA/people.json' should be our path
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var peopleObj = {}; // we expect this to hold a parsed JSON file/object

function eventJSON(response) {
    if(!response) return {};
    peopleObj = JSON.parse(response);
    placeContent();
}

function placeContent() {
    let target = document.querySelector('#peopleList');
    peopleObj.people.forEach((person) => {
        let {firstName: fname = 'John', lastName: lname = 'Doe', Profession: prof = 'Farmer', Spouse: spouse, Children: children = []} = person;
        let newEl = document.createElement('div');
        newEl.classList.add('person');

        let list = document.createElement('ul');
        list.classList.add('traits');

        let fnTrait = document.createElement('li');
        fnTrait.textContent = `Name: ${fname} ${lname}`;
        list.appendChild(fnTrait);

        let profTrait = document.createElement('li');
        profTrait.textContent = `Profession: ${prof}`;
        list.appendChild(profTrait);

        let spouseItem = document.createElement('li');
        spouseItem.textContent = 'Spouse';
        list.appendChild(spouseItem);

        if (typeof spouse === 'object') {
            let sEl = document.createElement('div');
            sEl.classList.add('personSpouse');

            let sList = document.createElement('ul');
            sList.classList.add('traits');

            let sfn = document.createElement('li');
            sfn.textContent = `Name: ${spouse['firstName']} ${spouse['lastName']}`;
            sList.appendChild(sfn);

            let sp = document.createElement('li');
            sp.textContent = `Profession: ${spouse['Profession']}`;
            sList.appendChild(sp);

            sEl.appendChild(sList);
            list.appendChild(sEl);
        }

        if (children.length) {
            let childrenItem = document.createElement('li');
            childrenItem.textContent = 'Children';
            list.appendChild(childrenItem);
        }

        for (let childIndex in children) {
            let child = children[childIndex];
            let {firstName: cfn, lastName: cln, Profession: cp} = child;

            let cEl = document.createElement('div');
            cEl.classList.add('personChild');

            let cList = document.createElement('ul');
            cList.classList.add('traits');

            let cn = document.createElement('li');
            cn.textContent = `Name: ${cfn} ${cln}`;
            cList.appendChild(cn);

            let cpe = document.createElement('li');
            cpe.textContent = `Role: ${cp}`;
            cList.appendChild(cpe);

            cEl.appendChild(cList);
            list.appendChild(cEl);

        }

        newEl.appendChild(list);
        target.appendChild(newEl);
    });
}

loadJSON('./DATA/people.json', eventJSON);