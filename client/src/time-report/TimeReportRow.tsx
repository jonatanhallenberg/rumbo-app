import { useState } from "react";
import { Table, Button, IconButton, TrashIcon, CrossIcon, majorScale, MoreIcon, EditIcon } from "evergreen-ui";
import { TimeReport} from "../types";
import styled from "styled-components";
import dateformat from "dateformat";
import { isMobile } from "react-device-detect";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../app/slices/appSlice";
import timeReportSlice from "./slices/timeReportSlice";

type TimeReportRowType = {
    timereport: any;
    onRemove: (timereport: any) => any;
    isAdmin: boolean;
};

const StyledIconButton = styled(IconButton)`
    box-shadow: none;
    background-image: none;
    background-color: inherit;
    width: 24px;
    height: 24px;
    &:hover {
      background-image: none !important;
      background-color: #ddd;
    }
  `;

const StyledTableRow = styled(Table.Row)`
    &:hover > div {
      background-color: #efefef;
    }
  `;

const TimeReportRow = ({
    timereport,
    onRemove,
    isAdmin
}: TimeReportRowType) => {

    const dispatch = useDispatch();

    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const projects = useSelector((state: any) => state.app.projects); // flytta ut till View
    // console.log('Projects: ', projects);
    // console.log('Timereport: ', timereport);
    console.log('timereport: ', timereport);
    let temp : any;
    let tempDescription : any;
    //console.log(timereport._doc.project_id);
    if('_doc' in timereport && 'project_id' in timereport._doc){
        temp = timereport._doc.project_id;
        console.log(temp);
    }
    else{
        temp = timereport.project_id;
    }
    if('_doc' in timereport && 'description' in timereport._doc){
        tempDescription = timereport._doc.description;
        console.log(tempDescription);
    }
    else{
        tempDescription = timereport.description;
    }
    console.log("projects", projects);
    //console.log('timereport', timereport._doc.project_id);
   //console.log("tempprojectid: ", temp._doc.project_id);
   // const project = projects.find((project: Project) => timereport.project_id === project._id);
    let project = projects.find((project1: Project) => {
        //console.log("Whole temp: ", temp);
        // console.log("temp: ", temp._doc.project_id);
        // console.log("projects: ", project._id);
            console.log("checkProj1_id: ",  project1._id);
            console.log("checkTemp: ",  temp);
            // if(temp === undefined){
            //     return true;
            // }
            return temp === project1._id; 
    });
    console.log('project: ',project);
    // if(project === undefined){
    //     project = {
    //         project_name : ""
    //     }
    // }
    console.log('project: ',project);
    const renderMoreMenu = () => (
        <>
            <IconButton icon={TrashIcon} intent="danger" marginLeft={majorScale(1)} onClick={() => { setShowConfirmDelete(true); setShowMoreMenu(false); }} />
            <IconButton icon={CrossIcon} intent="none" marginLeft={majorScale(1)} onClick={() => { setShowMoreMenu(false); }} />
        </>
    )

    const renderConfirmDelete = () => (
        <>
            <Button intent="danger" onClick={() => onRemove(timereport)}>Ta bort</Button>
            <Button marginLeft={majorScale(1)} intent="none" onClick={() => setShowConfirmDelete(false)}>Ångra</Button>
        </>
    )
      
    return (
        <StyledTableRow
            key={timereport.id}
        >
            {!isMobile && (
                <>
                    <Table.TextCell maxWidth="125px">
                         {/* {dateformat(timereport.time, "yyyy-mm-dd")}  */}
                    </Table.TextCell>
                    <Table.TextCell>{tempDescription}</Table.TextCell>
                </>
            )}
            {isMobile && (
                <>
                    <Table.TextCell>
                        <p>
                            {/* {dateformat(timereport.time, "yyyy-mm-dd")} */}
                            <br />
                            { tempDescription}
                        </p>
                    </Table.TextCell>
                </>
            )}
            {<><Table.TextCell isNumber>
                {new Intl.NumberFormat("sv-SE").format(timereport.hours)}
            </Table.TextCell>
                <Table.TextCell>{project.project_name}</Table.TextCell>
                <Table.Cell justifyContent="right" width="10px">
                    {
                        isAdmin && (showMoreMenu ? renderMoreMenu() : showConfirmDelete ? renderConfirmDelete() : <StyledIconButton icon={MoreIcon} onClick={() => setShowMoreMenu(true)} />)
                    }
                </Table.Cell></>}

        </StyledTableRow>
    )
};

export default TimeReportRow;