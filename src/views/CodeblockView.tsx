import { FlexColumn, Heading1 } from 'components/Generics'
import { User } from 'models/user.interface'
import { FunctionComponent, useEffect } from "react"
import styled from 'styled-components'
import Highlight from 'react-highlight'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface Props {
    loggedinUser: User | undefined
}

const CodeblockView: FunctionComponent<Props> = ({ loggedinUser }) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // Handles authorization to this page
    useEffect(() => {
        // TODO renavigate later
        const studentLoginName = searchParams.get('student_login')
        if (!loggedinUser) {
            let path = '/user/login'
            if (studentLoginName) path += '?student_login=' + studentLoginName
            toast.error('You must log in first.', {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            })
            navigate(path)
        } else if (studentLoginName && studentLoginName !== loggedinUser.username) {
            toast.error('You must be granted a unique link in order to see this page.', {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            })
            navigate('/user/login')
        }
    }, [loggedinUser, navigate, searchParams])

    return (
        <CodeblockContainer align='center'>
            <Heading1 fontSize='3em' align='center' mb={30}>
                codblock title
            </Heading1>
            <Highlight>
                {`function foo() { return 'bar' }`}
            </Highlight>
        </CodeblockContainer>
    )
}

const CodeblockContainer = styled(FlexColumn)`
    padding-top: 50px;
    max-width: 800px;
    margin: auto;
`

export { CodeblockView }