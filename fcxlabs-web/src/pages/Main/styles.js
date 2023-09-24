import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 40px 0 40px;
    
    .p-card {
        margin-bottom: 20px;

        .p-card-content {
            width: 100%;
            padding: 0;
        }

        input {
            width: 95%;
            margin-bottom: 20px;
        }

        .p-dropdown {
            width: 95%;
        }

        button {
            margin-right: 10px;
        }

        p {
            margin: 0;
        }
    }
`;

export const FilterField = styled.div`
    display: flex;
    
`;

export const Control = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 20px;

    .p-button {
        margin-left: 10px;
    }
`;

export const DatatableArea = styled.div`
    .p-datatable-wrapper {
        font-size: 14px;
    }
`;