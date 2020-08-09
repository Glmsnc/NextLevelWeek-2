import React, { useState, FormEvent } from 'react';

import './styles.css'
import PageHeader from '../../components/PageHeader';
import TeacherItem,{Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';



function TeacherList(){
    
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('');
    const [weekday, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    
   async function searchTeachers(e: FormEvent){
        e.preventDefault();

      const {data} = await api.get('classes',{
            params:{
            subject,
            week_day:weekday,
            time
            }
        })

       setTeachers(data);
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers" onSubmit={searchTeachers}>

                <Select 
                name="subject" 
                label="Matéria"
                value={subject}
                onChange={ e=> { setSubject(e.target.value)}}
                options={[
                    {value: 'Artes', label: 'Artes'},
                    {value: 'Biologia', label: 'Biologia'},
                    {value: 'Ciências', label: 'Ciências'},
                    {value: 'Física', label: 'Física'},
                    {value: 'Geografia', label: 'Geografia'},
                    {value: 'História', label: 'História'},
                    {value: 'Português', label: 'Português'},
                ]} />
                                <Select 
                name="week_day" 
                label="Dia da Semana"
                value={weekday}
                onChange={ e=> { setWeekDay(e.target.value)}}
                options={[
                    {value: '0', label: 'Domingo'},
                    {value: '1', label: 'Segunda'},
                    {value: '2', label: 'Terça'},
                    {value: '3', label: 'Quarta'},
                    {value: '4', label: 'Quinta'},
                    {value: '5', label: 'Sexta'},
                    {value: '6', label: 'Sábado'},
                ]} />
                <Input type="time"
                value={time}
                onChange={ e=> { 
                    setTime(e.target.value)

                    }} name="time" label="Hora"/>

                    <button type="submit"> Buscar</button>

                </form>
            </PageHeader>

            <main>
                
            {teachers.map( (teacher: Teacher) =>{
             return <TeacherItem key="teacher.id" teacher={teacher} />
                    })
                }
      </main>

        </div>
    )
}

export default TeacherList;