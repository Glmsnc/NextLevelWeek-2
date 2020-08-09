import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm(){

    const history = useHistory();

    const [ name, setName] = useState('');
    const [ whatsapp, setWhatsapp] = useState('');
    const [ bio, setBio] = useState('');
    const [ avatar, setAvatar] = useState('');

    const [ subject, setSubject] = useState('');
    const [ cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        {week_day:0, from: '9:00 AM', to:'4:00 PM'},
    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {
                week_day:0,
                from: '',
                to: ''
            }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value:string){
        const updatedSchedule = scheduleItems.map((scheduleItem, index)=>{
            if(index === position){
                return { ...scheduleItem, [field]: value}
            }
            return scheduleItem;
        });

        setScheduleItems(updatedSchedule);

    }
    function handleCreateClass(e:FormEvent){
        e.preventDefault();
        api.post('classes',{
            name,
            avatar,
            bio,
            cost: Number(cost),
            subject,
            whatsapp,
            schedule:scheduleItems
        }).then(()=>{
            alert('Sucesso ao cadastrar');
            history.push('/');
        }).catch(()=>{
            alert('Erro ao cadastrar')
        })
    }

    return(
        
        <div id="page-teacher-form" className="container">
        <PageHeader title="Que maneiro que você quer dar aulas."
         description="O primeiro passo é preencher esse formuçário de inscrição">
            Teste
        </PageHeader>
        <main>
            <form onSubmit={handleCreateClass}>
            <fieldset>
                <legend> Seus Dados</legend>
                <Input 
                name="name" 
                label="Nome Completo"  
                value={name} 
                onChange={(e)=> setName(e.target.value)}/>
                <Input name="avatar" 
                label="Avatar" 
                value={avatar} 
                onChange={(e)=> setAvatar(e.target.value)}/>
                <Input 
                name="whatsapp" 
                label="Whatsapp" 
                value={whatsapp} 
                onChange={(e)=> setWhatsapp(e.target.value)} />
                <Textarea 
                name="bio" 
                label="Biografia"
                value={bio} 
                onChange={(e)=> setBio(e.target.value)}  />
            </fieldset>

            <fieldset>
                <legend> Sobre a aula</legend>
                <Select 
                name="subject" 
                label="Matéria"
                
                value={subject} 
                onChange={(e)=> setSubject(e.target.value)} 
                options={[
                    {value: 'Artes', label: 'Artes'},
                    {value: 'Biologia', label: 'Biologia'},
                    {value: 'Ciências', label: 'Ciências'},
                    {value: 'Física', label: 'Física'},
                    {value: 'Geografia', label: 'Geografia'},
                    {value: 'História', label: 'História'},
                    {value: 'Português', label: 'Português'},
                ]} />
                <Input 
                name="cost" 
                label="Custo da sua hora por aula" 
                value={cost} 
                onChange={(e)=> setCost(e.target.value)} />
            </fieldset>

            <fieldset>
                <legend> 
                    Horários disponíveis 
                    <button type="button" onClick={addNewScheduleItem}> 
                    + Novo horário
                    </button>
                </legend>
                <div className="schedule-item">
                    
                    {scheduleItems.map((scheduleItem, index) =>{
                        return(
                            <>
                            <Select 
                            key={scheduleItem.week_day}
                            name="week_day" 
                            label="Dia da Semana"
                            value={scheduleItem.week_day}
                            onChange={e=> setScheduleItemValue( index, 'week_day', e.target.value)}
                            options={[
                                {value: '0', label: 'Domingo'},
                                {value: '1', label: 'Segunda'},
                                {value: '2', label: 'Terça'},
                                {value: '3', label: 'Quarta'},
                                {value: '4', label: 'Quinta'},
                                {value: '5', label: 'Sexta'},
                                {value: '6', label: 'Sábado'},
                            ]} />
                             <Input 
                             name="from" 
                             label="Das" 
                             type="time"
                             value={scheduleItem.from}
                             onChange={e=> setScheduleItemValue( index, 'from', e.target.value)}/>
                             <Input 
                             name="to" 
                             label="Até" 
                             type="time"
                             value={scheduleItem.to}
                             onChange={e=> setScheduleItemValue( index, 'to', e.target.value)}/>
                            </>
                        );
                    })}


               
                    
                   
                </div>
            </fieldset>

            <footer>
                <p>
                   <img src={warningIcon} alt="Aviso importante"/>
                   Importante! <br />
                    Preencha todos os dados
                </p>

                <button type="submit"> Salvar cadastro</button>
            </footer>
            </form>
        </main>
    </div>
   
    )
}

export default TeacherForm;