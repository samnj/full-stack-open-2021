import React from 'react'

const Courses = ({ courses }) => {
  return (
    courses.map(course =>
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  )
}

const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part
          key={part.id}
          part={part.name}
          exercises={part.exercises}
        />)}
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises {parts.reduce((sum, part) =>
      sum + part.exercises, 0)}
    </p>
  )
}

export default Courses
