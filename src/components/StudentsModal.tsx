import { User } from 'models/user.interface'
import { Fragment, FunctionComponent, useEffect, useState } from "react"
import { userService } from 'services/user.service'
import styled from 'styled-components'
import { flexAlign, previewItem } from 'styles/setup/mixins'
import { FlexColumn, FlexRow, Heading3 } from './Generics'

interface Props {
    onCloseModal: () => void
    onSelectStudent: (student: User) => void
    isModalOpen: boolean
}

export const StudentsModal: FunctionComponent<Props> = ({ onCloseModal, isModalOpen, onSelectStudent }) => {
    const [students, setStudents] = useState<User[]>()

    useEffect(() => {
        (async () => {
            const studentsDB = await userService.query({ isMentor: false })
            setStudents(studentsDB)
        })()
    }, [])

    return (
        <Fragment>
            {isModalOpen && <Screen onClick={onCloseModal} />}
            <ModalContainer isModalOpen={isModalOpen} gap={10}>
                <CloseBtn onClick={onCloseModal}>x</CloseBtn>
                <Heading3 align='center' fontSize='1.5em'>
                    Choose one of your students
                </Heading3>
                {students && <StudentList>
                    {students.map((student, idx) => (
                        <StudentPreview
                            align='center'
                            gap={15}
                            key={student._id}
                            onClick={() => { onSelectStudent(student) }
                            }>
                            <StudentProfileImg src={`https://xsgames.co/randomusers/assets/avatars/male/${idx}.jpg`} alt="profile" />
                            <Heading3>{student.username}</Heading3>
                        </StudentPreview>
                    ))}
                </StudentList>}
            </ModalContainer>
        </Fragment>
    )
}

const Screen = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: gray;
    opacity: 0.2;
    cursor: pointer;
`

const ModalContainer = styled(FlexColumn) <{ isModalOpen: boolean }> `
    transform: translateY(-600%);
    position: fixed;
    top: 50%;
    padding: 40px;
    background-color: ${({ theme: { blackPrimary } }) => blackPrimary};
    border-radius: 5px;
    transition: transform 200ms ease-in-out;
    box-shadow: rgb(255 255 255 / 20%) 0px 0px 10px;
    ${({ isModalOpen }) => isModalOpen && 'transform: translateY(-60%)'}
`

const CloseBtn = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 5px 12px;
    border-radius: 50%;
    transition: background-color 100ms;
    font-size: 20px;

    &:hover {
        background-color: ${({ theme: { blackLight } }) => blackLight};
    }
`

const StudentList = styled(FlexColumn)`
    div:nth-child(even) {
        background-color: ${({ theme: { blackLight } }) => blackLight};
    }
`

const StudentPreview = styled(FlexRow)`
    ${previewItem}
`

const StudentProfileImg = styled.img`
    border-radius: 50%;
    height: 30px;
`