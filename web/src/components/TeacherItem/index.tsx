import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

interface TeacherItemProps{

  teacher:Teacher

}

export interface Teacher{
  id: number,
  avatar: string,
  const: number, 
  name: string,
  subject: string, 
  whatsapp: string, 
  bio: string
}
const TeacherItem:React.FC<TeacherItemProps> = ({teacher}) =>{
  
  function createNewConnection(){
    api.post('connections',{
      user_id: teacher.id,
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Diego Fernandes" />
        <div>
          <strong>  {teacher.name}</strong>
          <span>
            {teacher.subject}
          </span>
        </div>
      </header>
      <p>
        {teacher.bio}
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;