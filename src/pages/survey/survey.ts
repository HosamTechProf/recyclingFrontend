import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SurveyProvider } from '../../providers/survey/survey'
/**
 * Generated class for the SurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {
	question;
	type;
	q1;
	q2;
	q3;
	q4;
	q5;
	q6;
  constructor(private surveyProvider: SurveyProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.question = 0;
  }

  ansewrType(question, type){
  	this.type = type;
  	if (type === 'Super') {
  		this.question = 1
  	}else{
  		this.question = 5
  	}
  }

  ansewrQuestion1(question, answer){
  	this.question = question;
  	this.q1 = answer;
  }

  ansewrQuestion2(question, answer){
  	this.question = question;
  	this.q2 = answer;
  }

  ansewrQuestion3(question, answer){
  	this.question = question;
  	this.q3 = answer;
  }

  ansewrQuestion4(question, answer){
  	this.question = question;
  	this.q4 = answer;
  	let info = {
  		type: this.type,
  		q1: this.q1,
  		q2: this.q2,
  		q3: this.q3,
  		q4: this.q4
  	}
  	this.surveyProvider.addAnswer(info, 'api/auth/addanswer').subscribe()
  }

  ansewrQuestion5(question, answer){
  	this.question = question;
  	this.q5 = answer;
  }

  ansewrQuestion6(question, answer){
  	this.question = question;
  	this.q6 = answer;
  	let info = {
  		type: this.type,
  		q5: this.q5,
  		q6: this.q6
  	}
  	this.surveyProvider.addAnswer(info, 'api/auth/addanswer').subscribe()
  }

}
