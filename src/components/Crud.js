import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { set, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUser } from '../Store/userSlice';

const Crud = () => {
  // to chek if user is loged in
  const user = useSelector(selectUser);
  if (user === null) window.location.href = "http://localhost:3000/login";
  // initializ js variables
  const persons = [];

  // define state variablesa

  const API_URL = 'http://localhost:8080/api/v1/person';

  // Alert
  const [alert, setAlert] = useState({ type: '', message: '' });

  // person

  const [personList, setPersonList] = useState(persons);
  const [showDetails, setShowDetails] = useState(false);
  const [person, setPerson] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    title: "",
  });


  // useEfect

  const [reload, setReload] = useState(false);
  // useForm

  const { register, handleSubmit, formState: { errors } } = useForm();

  // hide when editing
  const [personId, setPersonId] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  // search bar
  const [email, setshowEmail] = useState(true);
  const [hideseacrh, setHideSeacrh] = useState(false);

  const Form = () => {

    return (
      <>
        <br />
        <form className='rounded p-2 m-2 mb-5' onSubmit={handleSubmit(saveData)}>
          <div>
            <h4>Lägg till nya medlemar</h4>
          </div>
          <div className='row'>
            <div className='col'>
              Förnamn
              <input
                type='text'
                className='form-control'
                id='firstName'
                {...register('firstName', { required: true })}
                placeholder='Ange förnamn...'
              />
              {errors.firstName && errors.firstName.type === 'required' && (
                <span className='text-danger'>Förnamn krävs!</span>
              )}
            </div>
            <div className='col'>
              Efternamn
              <input
                type='text'
                className='form-control'
                id='lastName'
                {...register('lastName', { required: true })}
                placeholder='Ange efternamn...'
              />
              {errors.lastName && errors.lastName.type === 'required' && (
                <span className='text-danger'>Efternamn krävs!</span>
              )}
            </div>
          </div>

          <br />

          <div className='row'>
            <div className='col'>
              Email
              <input
                type='text'
                className='form-control'
                id='email'
                {...register('email', { required: true })}
                placeholder='Ange email...'
              />
              {errors.email && errors.email.type === 'required' && (
                <span className='text-danger'>Email krävs!</span>
              )}
              <br />
              Role
              <select
                className='form-control'
                id='title'
                {...register('title', { required: true })}
                defaultValue='user'
                placeholder='user'>
                <option value='user'>Användare</option>
                <option value='teacher'>Lärare</option>
                <option value='admin'>Admin</option>
              </select>
            </div>
          </div>
          <br />
          <div className='col'>
            <button type='submit' className='btn btn-success m-2'>
              Lägg till
            </button>
            <button
              type='button'
              className='btn btn-danger m-2'
              onClick={() => {
                console.log('RESET:');
                document.getElementById('firstName').value = '';
                document.getElementById('lastName').value = '';
                document.getElementById('email').value = '';
                document.getElementById('title').value = 'user';
              }}
            >
              Återställ
            </button>
          </div>

        </form>
      </>
    )
  };

  // Save Form Data for adding
  const saveData = async (data) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const title = data.title;

    const newPerson = { firstName, lastName, email, title }

    await axios.post(API_URL, newPerson).then(response => {
      if (response.status === 201) {
        updateList();
        setAlert({ type: 'success', message: 'Objekt tillagd!' });
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }

    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message });
    });
  };

  //useEfect
  useEffect(() => {
    getRequestAction();
    setShowDetails(false)
  }, [reload]);

  const updateList = () => {
    setReload(!reload);
  }
  // Details for person
  const PersonDetails = () => {
    return (
      <>
        {showDetails && (
          <div className='card'>
            <div className='card-header bg-dark text-white'>
              Info
              <div className='card-body'>
                <div className='bm-3'>
                  <span>ID : {person.id}</span>
                </div>
                <div className='bm-3'>
                  <span>Namn : {person.firstName + " " + person.lastName}</span>
                </div>
                <div className='bm-3'>
                  <span>Email : {person.email}</span>
                </div>
                <div className='bm-3'>
                  <span>Titel : {person.title}</span>
                </div>
              </div>
              <button type='button' className='btn btn-danger' onClick={updateList}>Göm</button>
            </div>

          </div>
        )}
      </>
    );
  }

  // Table
  const Table = () => {
    return (
      <table className="table bg-dark text-white rounded shadow">
        <TableHeader />
        <TableRow list={personList} />
      </table>
    );
  }

  const TableHeader = () => {

    const togleSearch = () => {
      setHideSeacrh(!hideseacrh);
      setShowForm(!showForm);
    }

    return (
      <thead>
        <tr>
          <th colSpan="4" className="table-dark rounded-top shadow">
            <div className="d-flex justify-content-between align-items-center">
              <div>Användarlista <button type="button" className='btn btn-primary ms-2' onClick={togleSearch}>Sök</button></div>
            </div>
          </th>
        </tr>
        <tr>
          <th>ID</th>
          <th>Namn</th>
          <th>Email</th>
          <th>Åtgärd</th>
        </tr>
      </thead>
    );
  }

  const TableRow = (props) => {

    if (!props.list && props.list.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="5">Data ej funnen</td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        {props.list.map((person) => {
          const row = (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.firstName + " "} {person.lastName} </td>
              <td>{person.email}</td>
              <td>
                <TableAction person={person} />
              </td>
            </tr>
          );
          return row;
        })}
      </tbody>
    );

  }

  const TableAction = (props) => {

    const handleDetailsClick = async () => {
      console.log("PERSON:", props.person.id);

      await axios.get(API_URL + '/' + props.person.id).then(response => {
        if (response.status === 200) {
          setPerson(response.data);
          setShowDetails(true);
          setAlert({ type: 'success', message: 'Objekt hittad!' })
        } else {
          setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
        }
      }).catch(error => {
        console.log("ERROR: ", error);
        setAlert({ type: 'danger', message: error.message })
      });

    }
    const handleDeleteClick = async () => {
      console.log("PERSON: Deleted ", props.person.id);
      // Call the API ( for all buttons )
      await axios.delete(API_URL + '/' + props.person.id).then(response => {
        updateList();
        if (response.status === 204) {
          setAlert({ type: 'success', message: 'Objekt updaterad!' });
        } else {
          setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
        }
      }).catch(error => {
        console.log("ERROR: ", error);
        setAlert({ type: 'danger', message: error.message });
      });


    };
    const enableEdit = () => {
      setShowForm(false);
      setShowTable(false);

      setShowEdit(true);

    }
    const handleEditClick = async () => {
      enableEdit();
      setPersonId(props.person.id);
    };

    return (
      <div>
        <button className='btn btn-primary m-2' onClick={handleDetailsClick}>Detaljer</button>
        <button className='btn btn-danger m-2' onClick={handleDeleteClick}>Ta bort</button>
        <button className='btn btn-warning m-2' onClick={handleEditClick}>Ändra</button>
      </div>
    )
  }
  // update / save Data 
  const upDate = async (data) => {
    const id = personId;
    console.log(id);
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const title = data.title;

    const updatedPerson = { id, firstName, lastName, email, title }
    console.log(updatedPerson);

    // Call the API ( for all buttons
    await axios.put(API_URL, updatedPerson).then(response => {
      updateList();

      if (response.status === 204) {
        setAlert({ type: 'success', message: 'Objekt ändrad!' });
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message });
    });
    setPersonId(null);
    goBack();
  }
  // after edeting you go back to list
  const goBack = () => {
    console.log('GOBACK');
    setShowForm(true);
    setShowTable(true);
    setShowEdit(false);
  }
  // empty the fields after ussage
  const empty = () => {
    console.log('EMPTY');
    document.getElementById('editfirstName').value = '';
    document.getElementById('editlastName').value = '';
    document.getElementById('editemail').value = '';
    document.getElementById('edittitle').value = '';

  }
  // to update / get the new list
  const getRequestAction = async () => {
    await axios.get(API_URL).then(response => {
      if (response.status === 200) {
        setPersonList(response.data);
        setAlert({ type: 'success', message: 'Objekt hittad!' })
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message })
    });
  }
  // Search bar 
  const Search = () => {

    const handleinput = () => {
      setshowEmail(!email);

    }


    if (email === true) return (
      <>
        <form className='rounded' onSubmit={handleSubmit(findbyname)}>
          <button className='btn btn-primary' onClick={handleinput}>Ändra till Email</button>
          <button type='submit' className='btn btn-success m-2' >Sök</button>
          <input type='text' className='form-control' id='Email' {...register("name")} placeholder='Ange Namn...' /></form>

      </>
    ); else
      return (<>
        <form className='rounded' onSubmit={handleSubmit(findbyemail)}>
          <button className='btn btn-primary' onClick={handleinput}>Ändra till Namn</button>
          <button type='submit' className='btn btn-success m-2' >Sök</button>
          <input type='text' className='form-control' id='Name' {...register("email")} placeholder='Ange Email...' /></form>

      </>)

  }
  const findbyname = async (data) => {
    const name = data.name;
    console.log(name)

  }
  const findbyemail = async (data) => {
    const email = data.email;
    console.log(email)

  }


  // what is seen on the page
  if (user !== null)
    return (
      <>
        <div className='person-form'>
          {showForm && <Form />}
        </div>
        <div className='person-details-container'>
          <PersonDetails />
        </div>

        <div>
          {showTable &&
            <div>
              {hideseacrh && <Search />}
              <Table />
            </div>}
        </div>

        <div>
          {showEdit && <>

            <form className='rounded-4 border p-2 m-2' onSubmit={handleSubmit(upDate)}>

              <div className='row'>
                <div className='col-2'> id
                  <input type={'number'} className='form-control' placeholder={personId} readOnly />

                </div>
              </div>


              <div className='row'>
                <div className='col'>
                  Förnamn
                  <input
                    type='text'
                    className='form-control'
                    id='firstName'
                    {...register('firstName', { required: true })}
                    placeholder='Ange förnamn...'
                  />
                  {errors.firstName && errors.firstName.type === 'required' && (
                    <span className='text-danger'>Förnamn krävs!</span>
                  )}
                </div>
                <div className='col'>
                  Efternamn
                  <input
                    type='text'
                    className='form-control'
                    id='lastName'
                    {...register('lastName', { required: true })}
                    placeholder='Ange efternamn...'
                  />
                  {errors.lastName && errors.lastName.type === 'required' && (
                    <span className='text-danger'>Efternamn krävs!</span>
                  )}
                </div>
              </div>

              <br />

              <div className='row'>
                <div className='col'>
                  Email
                  <input
                    type='text'
                    className='form-control'
                    id='email'
                    {...register('email', { required: true })}
                    placeholder='Ange email...'
                  />
                  {errors.email && errors.email.type === 'required' && (
                    <span className='text-danger'>Email krävs!</span>
                  )}
                  <br />
                  Role
                  <select
                    className='form-control'
                    id='title'
                    {...register('title', { required: true })}
                    defaultValue='user'
                    placeholder='user'>
                    <option value='user'>Användare</option>
                    <option value='teacher'>Lärare</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>

              </div>
              <br />
              <div className='col'>
                <button type='submit' className='btn btn-success m-2' >Lägg till</button>
                <button type='button' className='btn btn-danger m-2' onClick={empty} >Återställ</button>
                <button type='button ' className='btn btn-danger m-2' onClick={goBack} >Tillbaka</button>
              </div>

            </form>

          </>
          }
        </div>
      </>
    );
}
export default Crud;