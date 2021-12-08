
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class AnimalTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteAnimal = this.deleteAnimal.bind(this);
    }

    deleteAnimal() {
        axios.delete('http://paw8backend.herokuapp.com/animals/delete-animal/' + this.props.obj._id)
            .then((res) => {
                console.log('Animal successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }


    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.species}</td>
                <td>{this.ageCalculator(this.props.obj.age)}</td>
                <td>{this.props.obj.adopted === false ? 'No' : "Yes"}</td>
                <td>
                    <Link className="edit-link" to={"/edit-animal/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteAnimal} size="sm" variant="danger" href={"/animal-list"}>Delete</Button>
                    <i class="bi bi-x-square"></i>
                    
                </td>
            </tr>
        );
    }

    ageCalculator(age) {  
        var dob = new Date(age);  
          

        //extract the year, month, and date from user date input  
        var dobYear = dob.getYear();  
        var dobMonth = dob.getMonth();  
        var dobDate = dob.getDate();  
          
        //get the current date from the system  
        var now = new Date();  
        //extract the year, month, and date from current date  
        var currentYear = now.getYear();  
        var currentMonth = now.getMonth();  
        var currentDate = now.getDate();  
          
        //declare a variable to collect the age in year, month, and days  
        var animalAge = { };  
        var ageString = "";  
        
        //get years  
        var yearAge = currentYear - dobYear;  
        var monthAge = '';
        var dateAge = '';
          
        //get months  
        if (currentMonth >= dobMonth)  
          //get months when current month is greater  
          monthAge = currentMonth - dobMonth;  
        else {  
          yearAge--;  
          monthAge = 12 + currentMonth - dobMonth;  
        }  
      
        //get days  
        if (currentDate >= dobDate)  
          //get days when the current date is greater  
          dateAge = currentDate - dobDate;  
        else {  
          monthAge--;  
          dateAge = 31 + currentDate - dobDate;  
      
          if (monthAge < 0) {  
            monthAge = 11;  
            yearAge--;  
          }  
        }  
        //group the age in a single variable  
        animalAge = {  
        years: yearAge,  
        months: monthAge,  
        days: dateAge  
        };  
            
            
        if ( (animalAge.years > 0) && (animalAge.months > 0) && (animalAge.days > 0) )  
           ageString = animalAge.years + " years " + animalAge.months + " months and " + animalAge.days + " days";  
        else if ( (animalAge.years === 0) && (animalAge.months === 0) && (animalAge.days > 0) )  
           ageString =  animalAge.days + " days";  
        //when current month and date is same as birth date and month  
        else if ( (animalAge.years > 0) && (animalAge.months === 0) && (animalAge.days === 0) )  
           ageString = animalAge.years +  " years";  
        else if ( (animalAge.years > 0) && (animalAge.months > 0) && (animalAge.days === 0) )  
           ageString = animalAge.years + " years and " + animalAge.months + " months";  
        else if ( (animalAge.years === 0) && (animalAge.months > 0) && (animalAge.days > 0) )  
           ageString = animalAge.months + " months and " + animalAge.days + " days";  
        else if ( (animalAge.years > 0) && (animalAge.months === 0) && (animalAge.days > 0) )  
           ageString = animalAge.years + " years, and" + animalAge.days + " days";  
        else if ( (animalAge.years === 0) && (animalAge.months > 0) && (animalAge.days === 0) )  
           ageString = animalAge.months + " months";  
        //when current date is same as dob(date of birth)  
        else ageString = "0  days";   
      
        //display the calculated age  
        return ageString;   
                   
      
    }
}