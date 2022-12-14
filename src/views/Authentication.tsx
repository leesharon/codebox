import { useState, FunctionComponent } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Heading1, Heading5, PrimaryButton } from '../components/Generics'
import { Credentials, User } from 'models/user.interface'
import { userService } from 'services/user.service'
import { toast } from 'react-toastify'

interface Props {
  setLoggedinUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const Authentication: FunctionComponent<Props> = ({ setLoggedinUser }) => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    } as Credentials,
    validationSchema: Yup.object({
      username: Yup.string()
        .required('No username provided.')
        .min(3, 'username is too short - should be 3 chars minimum.')
        .max(20, 'Must be 20 characters or less'),
      password: Yup.string()
        .required('No password provided.')
        .min(5, 'Password is too short - should be 5 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),
    onSubmit: (values: Credentials) => {
      (async () => {
        try {
          const user = await userService.login(values)
          setLoggedinUser(user)
          if (user.isMentor) navigate('/lobby')
        } catch (err) {
          console.log(err, 'cannot login')
          toast.error('Invalid username or password', {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          })
        }
      })()
    },
  })

  return (
    <FormContainer>
      <Heading1 fontSize={'3em'}>CodeBox</Heading1>
      <Form onSubmit={formik.handleSubmit}>
        <FormHeading fontSize='1em'>Log in to CodeBox</FormHeading>
        <Input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Enter username"
        />
        {formik.touched.username && formik.errors.username ? (
          <Error>{formik.errors.username}</Error>
        ) : (
          <span>&nbsp;</span>
        )}
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter password"
        />
        {formik.touched.password && formik.errors.password ? (
          <Error>{formik.errors.password}</Error>
        ) : (
          <span>&nbsp;</span>
        )}
        <Sumbit type="submit">Log in to CodeBox</Sumbit>
      </Form>
    </FormContainer >
  )
}

const FormContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1fr;
    padding-top: 50px;
    color: ${({ theme: { grayPrimary } }) => grayPrimary};
`

const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 32px 40px;
    background: ${({ theme: { blackLight } }) => blackLight};
    border-radius: 3px;
    box-shadow: rgb(255 255 255 / 20%) 0px 0px 10px;

    a {
        margin: auto;
        color: ${({ theme: { bluePrimary } }) => bluePrimary};
        font-size: 14px;

        &:hover {
            text-decoration: underline;
        }
    }
`

const FormHeading = styled(Heading5)`
  text-align: center;
  font-weight: bold;
`

const Input = styled.input`
  padding: 15px;
  font-size: 14px;
  border: 2px solid #dfe1e5;
  background-color: ${({ theme: { grayPrimary } }) => grayPrimary};
  color: #2d3748;
  border-radius: 9999px;
  color: rgb(77, 77, 77);
  width: 316px;
  height: 40px;
  transition: background-color, border-color 0.5s;
  align-self: center;

  &:focus {
    background-color: white;
    border-color: ${({ theme: { bluePrimary } }) => bluePrimary};
  }
`

const Error = styled.span`
  font-size: 12px;
  color: #e53e3e;
  margin: 3px 0 15px 3px;
`

const Sumbit = styled(PrimaryButton)`
  background-color: ${({ theme: { blackPrimary } }) => blackPrimary};

  &:hover {
    background-color: black;
    color: white;
  }
`