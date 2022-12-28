import React, { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'

const DATA_QL = gql`
    query {
        ToDos {
            ID
            To_Do_Name
            To_Do_Date
            To_Do_Time
            Remark
        }
    }
`

const CREATE_USER = gql`
    mutation createUser( $name: String!, $remark: String! ){
    createToDo(data: {
            To_Do_Name: $name,
            Remark: $remark,
            To_Do_Date: "2022-12-29",
            To_Do_Time: "1970-01-01",
        })
    }
`

function Component() {
    const { error, loading, data } = useQuery(DATA_QL)
    const [ createUser, {error: err, data: info} ] = useMutation(CREATE_USER)
    const [ datas, setDatas ] = useState()
    const [name, setName] = useState("")
    const [remark, setRemark] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    console.log(data, 'infoinfo');

    useEffect(() => {
        setDatas(data)
    }, [data])

    const handleClick = () => {
        createUser({ variables: { name, remark, date}})
    }
    

    if (loading) return <div>spinner....</div>
    if (error) return <div>something went wrong....</div>

    return (
        <div>
            <div>
                <input type="text" placeholder='name' onChange={e => setName(e.target.value)} />
                <input type="text" placeholder='Remark' onChange={e => setRemark(e.target.value)} /> 
                <input type="text" placeholder='date' onChange={e => setDate(e.target.value)} /> 
                <input type="text" placeholder='time' onChange={e => setTime(e.target.value)} />
                <button onClick={handleClick}>Create User</button>
            </div>

            <div>
                {datas?.ToDos?.map(da => (
                    <div key={da.ID}>
                        <h3>{da.To_Do_Name}</h3>
                        <p>{da.Remark}</p>
                        <span>{da.To_Do_Date} - {da.To_Do_Time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Component
