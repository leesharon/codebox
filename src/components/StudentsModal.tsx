import { Fragment, FunctionComponent } from "react"
import styled from 'styled-components'
import { FlexColumn, Heading3 } from './Generics'

interface Props {
    onCloseModal: () => void
    isModalOpen: boolean
}

const StudentsModal: FunctionComponent<Props> = ({ onCloseModal, isModalOpen }) => {

    return (
        <Fragment>
            <Screen onClick={onCloseModal} />
            <ModalContainer isModalOpen={isModalOpen} gap={10}>
                <Heading3 align='center' fontSize='1.5em'>
                    Choose one of your students
                </Heading3>
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
    transition: transform 200ms ease-in-out;
    ${({ isModalOpen }) => isModalOpen && 'transform: translateY(-60%)'}
`

export { StudentsModal }