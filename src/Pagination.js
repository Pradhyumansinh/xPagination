import { useState, useEffect } from 'react';
import style from "./Pagination.module.css";

const Pagination = () => {
    const [employees, setEmployees] = useState([]);
    const [filterdEmp, setFilteredEmp] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [prevCount, setPrevCount] = useState(1);
    const [nextCount, setNextCount] = useState(1);
    const [maxCount, setMaxCount] = useState(0);
    const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const emps = data.filter((item, i) => i < 10);
                setEmployees(data);
                setFilteredEmp(emps);
                setMaxCount(Math.round(data.length / 10));
                setNextCount(nextCount + 1);
                setPrevCount(prevCount - 1);
            })
            .catch((error) => alert("failed to fetch data"));
    }, [])

    const updateData = (data, updatedcount) => {
        const end = updatedcount * 10;
        if (pageCount > 0) {
            const start = end - 9;
            const empData = data.filter((item, i) => i + 2 > start && i < end);
            setFilteredEmp(empData);
        }
    }

    const handlePrevious = () => {
        if (pageCount > 1) {
            setPageCount(prev => prev - 1);
            setNextCount(nextC => nextC - 1);
            setPrevCount(prevc => prevc - 1);
            updateData(employees, prevCount);
        }
    }

    const handleNext = () => {
        if (pageCount > 0 && maxCount >= nextCount) {
            setPageCount(prev => prev + 1);
            setPrevCount(prevc => prevc + 1);
            setNextCount(nextC => nextC + 1);
            updateData(employees, nextCount);
        }
    }


    return (
        <div className={style.container}>
            <h2 className={style.heading}>Employee Data Table</h2>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th className={style.tableheaddata}>ID</th>
                        <th className={style.tableheaddata}>Name</th>
                        <th className={style.tableheaddata}>Email</th>
                        <th className={style.tableheaddata}>Role</th>
                    </tr>
                </thead>
                <tbody className={style.tbody}>
                    {filterdEmp.map((employee) => {
                        return (<tr key={employee.id}>
                            <td className={style.tableheaddata}>{employee.id}</td>
                            <td className={style.tableheaddata}>{employee.name}</td>
                            <td className={style.tableheaddata}>{employee.email}</td>
                            <td className={style.tableheaddata}>{employee.role}</td>
                        </tr>)
                    })}
                </tbody>
            </table><br></br>

            <div>
                <button className={style.successbtn} onClick={handlePrevious} value={"Previous"}>Previous</button>
                <button className={style.countbtn}>{pageCount}</button>
                <button className={style.successbtn} onClick={handleNext} value={"Next"}>Next</button>
            </div>
        </div>
    )
}

export default Pagination;