import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useAuth } from "../Utils/context";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../store/actions/users";
import { months } from "../constant";
import EditPersonalProfile from './EditPersonalProfile'
import EditareAdresaLivrare from './EditareAdresaLivrare'

const PersonalProfile = () => {
    const auth = useAuth()
    const dispatch = useDispatch()

    const [chosenPage, setChosenPage] = useState(1)
    const [isEditPage, setIsEditPage] = useState(false)

    const selectUsers = (state) => state.users;
    const { usersList } = useSelector(selectUsers);

    const changeChosenPage = (page) => {
        setIsEditPage(false)
        setChosenPage(page)
    }

    const changeIsEditPage = (page) => {
        setIsEditPage(page)
    }

    const currentUser = () => {
        return usersList.find(user => user._id === auth._id)
    }

    const getCorrectFormatOfDate = (date) => {
        const dateConverted = new Date(date);
        const day = dateConverted.getDate().toString();
        const correctDay = day.length === 1 ? "0" + day : day;
        const month = dateConverted.getMonth().toString();
        const correctMonth = months[month];
        const year = dateConverted.getFullYear();
        return correctDay + " " + correctMonth.slice(0, 3) + ". " + year;
    };

    const editProfile = () => {
        setIsEditPage(false)
    }

    useEffect(() => {
        dispatch(setUsers("https://backend-r4zkv.ondigitalocean.app/users"));
    }, []);

    return (
        <Grid sx={firstDivStyle}>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '12%', width: '100%' }}>
                <div style={{ alignSelf: 'center', marginRight: '40px', textAlign: 'left', display: 'flex', flexDirection: 'column' }} >
                    <Typography onClick={() => changeChosenPage(1)} sx={{ cursor: 'pointer', marginBottom: '40%', verticalAlign: 'middle', flex: 1, fontSize: '20px', fontWeight: chosenPage === 1 ? 700 : 500 }}>Informatii personale</Typography>
                    <Typography onClick={() => changeChosenPage(2)} sx={{ cursor: 'pointer', marginTop: '40%', verticalAlign: "middle", flex: 1, fontSize: '20px', fontWeight: chosenPage === 2 ? 700 : 500 }}>Adresa salvata</Typography>
                </div>
                <Divider orientation="vertical" flexItem />
                {isEditPage === false && chosenPage === 1 ?
                    <div style={{ marginLeft: '40px', marginTop: '50px', width: '75%', maxWidth: '1000px' }}>
                        <Typography sx={{ fontSize: '30px', fontWeight: 600, marginBottom: '20px' }}>Informatii personale</Typography>
                        <Divider sx={{ borderBottomWidth: 3, borderColor: 'black' }} />
                        <div style={{ marginTop: '40px', marginLeft: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Nume</Typography>
                            <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().firstName ? currentUser().firstName : '-'} {currentUser().lastName ? currentUser().lastName : '-'}</Typography>
                        </div>
                        <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                        <div style={{ marginTop: '40px', marginLeft: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Email</Typography>
                            <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().emailAddress ? currentUser().emailAddress : '-'}</Typography>
                        </div>
                        <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                        <div style={{ marginTop: '40px', marginLeft: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Numar de telefon</Typography>
                            <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().phoneNumber ? currentUser().phoneNumber : '-'}</Typography>
                        </div>
                        <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                        <div style={{ marginTop: '40px', marginLeft: '40px', marginBottom: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Ziua de nastere</Typography>
                            <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{getCorrectFormatOfDate(currentUser().birthday) ? getCorrectFormatOfDate(currentUser().birthday) : '-'}</Typography>
                        </div>
                        <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                        <Button
                            variant="contained"
                            onClick={() => changeIsEditPage(1)}
                            sx={{
                                background: "#CF112C",
                                width: "fit-content",
                                height: "fit-content",
                                alignSelf: "right",
                                marginRight: "25px",
                                marginBottom: "25px",
                                "&:hover": {
                                    background: "#e2030f",
                                },
                            }}
                        >
                            Editeaza datele personale
                        </Button>
                    </div> :
                    isEditPage === false && chosenPage === 2 ?
                        <div style={{ marginLeft: '40px', marginTop: '50px', width: '75%', maxWidth: '1000px' }}>
                            <Typography sx={{ fontSize: '30px', fontWeight: 600, marginBottom: '20px' }}>Adresa de livrare</Typography>
                            <Divider sx={{ borderBottomWidth: 3, borderColor: 'black' }} />
                            <div style={{ marginTop: '40px', marginLeft: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Judet</Typography>
                                <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().county ? currentUser().county : '-'}</Typography>
                            </div>
                            <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                            <div style={{ marginTop: '40px', marginLeft: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Oras</Typography>
                                <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().city ? currentUser().city : '-'}</Typography>
                            </div>
                            <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                            <div style={{ marginTop: '40px', marginLeft: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Sector</Typography>
                                <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().sector ? currentUser().sector : '-'}</Typography>
                            </div>
                            <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                            <div style={{ marginTop: '40px', marginLeft: '40px', marginBottom: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Strada</Typography>
                                <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().streetName ? currentUser().streetName : '-'}</Typography>
                            </div>
                            <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                            <div style={{ marginTop: '40px', marginLeft: '40px', marginBottom: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Numarul strazii</Typography>
                                <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().streetNumber ? currentUser().streetNumber : '-'}</Typography>
                            </div>
                            <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                            <div style={{ marginTop: '40px', marginLeft: '40px', marginBottom: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Bloc</Typography>
                                <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().bloc ? currentUser().bloc : '-'}</Typography>
                            </div>
                            <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                            <div style={{ marginTop: '40px', marginLeft: '40px', marginBottom: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Scara</Typography>
                                <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().scara ? currentUser().scara : '-'}</Typography>
                            </div>
                            <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                            <div style={{ marginTop: '40px', marginLeft: '40px', marginBottom: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Numarul locuintei</Typography>
                                <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().apartmentNumber ? currentUser().apartmentNumber : '-'}</Typography>
                            </div>
                            <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                            <div style={{ marginTop: '40px', marginLeft: '40px', marginBottom: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Etaj</Typography>
                                <Typography sx={{ fontSize: '20px', marginRight: '5%' }}>{currentUser().etaj ? currentUser().etaj : '-'}</Typography>
                            </div>
                            <Divider sx={{ marginBottom: '40px', marginTop: '40px' }} />
                            <Button
                                variant="contained"
                                onClick={() => changeIsEditPage(2)}
                                sx={{
                                    background: "#CF112C",
                                    width: "fit-content",
                                    height: "fit-content",
                                    alignSelf: "right",
                                    marginRight: "25px",
                                    marginBottom: "25px",
                                    "&:hover": {
                                        background: "#e2030f",
                                    },
                                }}
                            >
                                Editeaza adresa de livrare
                            </Button>
                        </div> : isEditPage === 1 && chosenPage === 1 ?
                            <EditPersonalProfile onEditProfile={editProfile} currentUser={currentUser()} /> :
                            isEditPage === 2 && chosenPage === 2 ?
                                <EditareAdresaLivrare onEditProfile={editProfile} currentUser={currentUser()} /> : null}
            </div>
        </Grid >
    )
}

const firstDivStyle = {
    "@media (min-width: 2100px)": {
        width: "65%",
        margin: "auto",
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
};

export default PersonalProfile