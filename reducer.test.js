const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('./reducer')

// index
// Test 1: add new project to projects data"base"
// Test 2: add new ppe to ppe data"base"

//Default Test Setup
// test('adds a new project to the project data"base"',function(t){
//   let state = { }
//   freeze(state)
//
//   let action = {type:'' , payload:''}
//
//   let expectedState ={ }
//
//   let newState = reducer(state,action)
//
//   t.deepEqual(newState, expectedState, 'adds a new project to the project Data')
//   t.end()
// })

test('Test 1: adds a new project to the project data"base"',function(t){

  const state = {
    projects: [{
      project_id: 1,
      project_number:'122433',
      project_name: 'Office Repairs',
      location:'1 Willis street,',
      SWMS:'N/A',
      important_Notices:''
    }]
  }
  freeze(state)
  
  const action = {type:'ADD_PROJECT_TO_PROJECTDATA' , payload:'2'}

  const expectedState ={
    projects: [
      {project_id: 1,
        project_number:'122433',
        project_name: 'Office Repairs',
        location:'1 Willis street,',
        SWMS:'N/A',
        important_Notices:''
      },
      {project_id: 2,
        project_number:'345221',
        project_name: 'Chorus',
        location:'3 thorndon street',
        SWMS:'available',
        important_Notices:'Wooden ladders only'
      }]
  }

  const newState = reducer(state,action)

  t.deepEqual(newState, expectedState, 'adds a new project to the project Data')
  t.end()
})
