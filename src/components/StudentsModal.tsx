import { User } from 'models/user.interface'
import { Fragment, FunctionComponent, useEffect, useState } from "react"
import { userService } from 'services/user.service'
import styled from 'styled-components'
import { FlexColumn, FlexRow, Heading3 } from './Generics'

interface Props {
    onCloseModal: () => void
    isModalOpen: boolean
    onSelectStudent: (student: User) => void
}

const StudentsModal: FunctionComponent<Props> = ({ onCloseModal, isModalOpen, onSelectStudent }) => {
    const [students, setStudents] = useState<User[]>()

    useEffect(() => {
        (async () => {
            const studentsDB = await userService.query({ isMentor: false })
            setStudents(studentsDB)
        })()
    }, [])

    return (
        <Fragment>
            <Screen onClick={onCloseModal} />
            <ModalContainer isModalOpen={isModalOpen} gap={10}>
                <Heading3 align='center' fontSize='1.5em'>
                    Choose one of your students
                </Heading3>
                {students && <StudentList>
                    {students.map((student) => (
                        <StudentPreview
                            align='center'
                            gap={15}
                            key={student._id}
                            onClick={() => { onSelectStudent(student) }
                            }>
                            <Heading3>{student.username}</Heading3>
                        </StudentPreview>
                    ))}
                </StudentList>}
            </ModalContainer>
        </Fragment>
    )
}

const Screen = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: gray;
    opacity: 0.2;
    cursor: pointer;
`

const ModalContainer = styled(FlexColumn) <{ isModalOpen: boolean }> `
    transform: translateY(-250%);
    position: fixed;
    top: 50%;
    padding: 40px;
    background-color: ${({ theme: { blackPrimary } }) => blackPrimary};
    border-radius: 5px;
    box-shadow: rgb(255 255 255 / 20%) 0px 0px 10px;
    ${({ isModalOpen }) => isModalOpen && 'transform: translateY(-60%)'}
`

const StudentList = styled(FlexColumn)`
    div:nth-child(even) {
        background-color: ${({ theme: { blackLight } }) => blackLight};
    }
`

const StudentPreview = styled(FlexRow)`

`

export { StudentsModal }