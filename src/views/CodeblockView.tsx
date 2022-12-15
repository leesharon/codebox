import { FlexColumn, Heading1 } from 'components/Generics'
import { User } from 'models/user.interface'
import { FunctionComponent, useEffect, useState } from "react"
import styled from 'styled-components'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { codeblockService } from 'services/codeblock.service'
import { Codeblock } from 'models/codeblock.interface'
import { toast } from 'react-toastify'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import _ from 'lodash'

interface Props {
    loggedinUser: User | undefined
}

const CodeblockView: FunctionComponent<Props> = ({ loggedinUser }) => {
    const navigate = useNavigate()
    const params = useParams()
    const [searchParams] = useSearchParams()
    const [codeblock, setCodeblock] = useState<Codeblock>()

    // Handles authorization to this page
    useEffect(() => {
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

    // Handles getting code block from DB
    useEffect(() => {
        (async () => {
            if (!params.codeblockId) return
            const codeblockDB = await codeblockService.getById(params.codeblockId)
            setCodeblock(codeblockDB)
        })()
    }, [params, setCodeblock])

    const handleChange = (val: string) => {
        if (loggedinUser?.isMentor) return
        if (!codeblock) return
        codeblockService.update({ _id: codeblock._id, code: val })
    }
    const throttleHandleChange = _.throttle(handleChange, 1000)

    return (
        <CodeblockContainer align='center'>
            <Heading1 fontSize='3em' align='center' mb={30}>
                {codeblock?.title}
            </Heading1>

            {loggedinUser && codeblock && <CodeMirror
                extensions={[javascript({ jsx: true })]}
                onChange={throttleHandleChange}
                theme={vscodeDark}
                height="400px"
                width="800px"
                value={codeblock.code}
                editable={!loggedinUser.isMentor}
            />}
        </CodeblockContainer>
    )
}

const CodeblockContainer = styled(FlexColumn)`
    padding-top: 50px;
    max-width: 800px;
    margin: auto;
`

export { CodeblockView }