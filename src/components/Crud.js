import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUser } from '../Store/userSlice';

const Crud = () => {
  const user = useSelector(selectUser); if (user === null) window.location.href = "http://localhost:3000/login";
  const persons = [];
  const [personId, setPersonId] = useState(null);
  const [personList, setPersonList] = useState(persons);

  const API_URL = 'http://localhost:8080/api/v1/user/';
  const [alert, setAlert] = useState({ type: '', message: '' });
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showDetails, setShowDetails] = useState(false);

  const [person, setPerson] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });

  const [reload, setReload] = useState(false);
  useEffect(() => {
    getRequestAction();
    setShowDetails(false)
  }, [reload]);

  const updateList = () => {
    setReload(!reload);
  }

  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

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
              Användarnamn
              <input
                type='text'
                className='form-control'
                id='Användarnamn'
                {...register('Användarnamn', { required: true })}
                placeholder='Ange Användarnamn...'
              />
              {errors.Användarnamn && errors.Användarnamn.type === 'required' && (
                <span className='text-danger'>Användarnamn krävs!</span>
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
                id='role'
                {...register('role', { required: true })}
                value={watch('role')}
                placeholder='user'
              >
                <option value='Member'>Användare</option>
                <option value='Teacher'>Lärare</option>
                <option value='Admin'>Admin</option>
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
                document.getElementById('firstName').value = '';
                document.getElementById('lastName').value = '';
                document.getElementById('email').value = '';
                document.getElementById('role').value = 'Member';
                document.getElementById('Användarnamn').value = '';
              }}
            >
              Återställ
            </button>
          </div>

        </form>
      </>
    )
  };


  const generateRandomUsercode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };
  const PersonDetails = () => {
    return (
      <>
        {showDetails && (
          <div className='card'>
            <div className='card-header bg-light text-black'>
              Info
              <div className='card-body'>
                <div className='bm-3'>
                  <span>ID : {person.id}</span>
                </div>
                <div className='bm-3'>
                  <span>Namn : {person.firstName + " " + person.lastName}</span>
                </div>
                <div className='bm-3'>
                  <span>Användarnamn : {person.username}</span>
                </div>
                <div className='bm-3'>
                  <span>Email : {person.email}</span>
                </div>
                <div className='bm-3'>
                  <span>Role : {person.role.roleTitle}</span>
                </div>
              </div>
              <button type='button' className='btn btn-danger' onClick={updateList}>Göm</button>
            </div>

          </div>
        )}
      </>
    );
  }
  const Table = () => {
    const [searchQuery, setSearchQuery] = useState('');


    const searchQueries = searchQuery.trim().toLowerCase().split(/\s+/);

    const filteredUsers = searchQueries.reduce((result, query) => {
      return result.filter(user =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query)
      );
    }, personList.slice());

    return (

      <table className="table bg-light text-black rounded shadow table-wrapper">
        <TableHeader setSearchQuery={setSearchQuery} searchQuery={searchQuery} />

        <TableRow list={filteredUsers} className="table-body" />

      </table>

    );
  };

  const TableHeader = ({ setSearchQuery, searchQuery }) => {
    return (
      <thead>
        <tr>
          <th colSpan="4" className="table-light rounded-top shadow">
            <div className="d-flex justify-content-between align-items-center">
              <div>Användarlista
                <input
                  type="text"
                  placeholder="Sök användare..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='mb-1 rounded m-2'
                />
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th className="table-header-cell">ID</th>
          <th className="table-header-cell">Namn</th>
          <th className="table-header-cell">Email</th>
          <th className="table-header-cell">Åtgärd</th>
        </tr>
      </thead>
    );
  };

  const TableRow = (props) => {
    if (!props.list || props.list.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="4">Data ej funnen</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {props.list.map((person) => (
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.firstName} {person.lastName}</td>
            <td>{person.email}</td>
            <td>
              <TableAction person={person} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const TableAction = (props) => {

    const handleDetailsClick = async () => {
      await axios.get(API_URL + "id/" + props.person.id).then(response => {
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
      await axios.delete(API_URL + "id/" + props.person.id).then(response => {
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
    };

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

  const getRoleByTitel = async (roleTitle) => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/role/title/" + roleTitle);
      if (response.status === 200) {
        setAlert({ type: 'success', message: 'Objekt tillagd!' });
        return response.data;
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
        return null;
      }
    } catch (error) {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message });
      return null;
    }
  };


  const saveData = async (data) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const userName = data.Användarnamn;
    const email = data.email;
    const role = await getRoleByTitel(data.role);

    const handleAddPerson = async () => {
      const newPerson = {

        firstName: firstName,
        lastName: lastName,
        email: email,
        username: userName + generateRandomUsercode(4),
        password: "password",
        role: getRoleByTitel(role),

      }
      setPerson(newPerson);
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
    }
    handleAddPerson();
  };


  const upDate = async (data) => {
    const id = personId;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const role = await getRoleByTitel(data.role);

    const handleUpdate = async () => {
      const updatedPerson = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: person.username,
        password: person.password,
        role: role,
      };
      await axios.put(API_URL, updatedPerson).then(response => {
        getRequestAction();
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

    handleUpdate();


  };

  const goBack = () => {

    setShowForm(true);
    setShowTable(true);
    setShowEdit(false);

  }
  const empty = () => {
    console.log('EMPTY');
    document.getElementById('editfirstName').value = '';
    document.getElementById('editlastName').value = '';
    document.getElementById('editemail').value = '';
    document.getElementById('edittitle').value = '';
  }

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
                    id='role'
                    {...register('role', { required: true })}
                    value={watch('role')}
                    placeholder='user'
                  >
                    <option value='Member'>Användare</option>
                    <option value='Teacher'>Lärare</option>
                    <option value='Admin'>Admin</option>
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