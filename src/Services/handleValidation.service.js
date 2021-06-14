import {INFO} from "../Constants/messages";
import {logDOM} from "@testing-library/react";

export const handleValidationService = (values) => {
    let errors = {
        avatar: '',
        title: '',
        status: '',
        effort: '',
        date: '',
        _brand: '',
        _team_lead: '',
        budget: '',
        formIsValid: false
    };
    // console.log(values)

    // if (typeof values["password"] !== "undefined") {
    // 	if (!values["password"].match(regexp.PASSWORD_REGEXP)) {
    // 		formIsValid = false;
    // 		errors["password"] = INFO.INVALID_PASSWORD_PATTERN
    // 	}
    // }

    if (!values.formIsValid) {

        if (!values.title || !values.title.length || values.title === '') {
            errors.title = INFO.EMPTY_FIELD
        } else {
            errors.formIsValid = true;
        }

        if (!values.status || !values.status.length) {
            errors.status = INFO.EMPTY_FIELD
        }

        if (!values.errors || !values.effort.length) {
            errors.effort = INFO.EMPTY_FIELD
        }

        if (!values._brand || !values._brand.length) {
            errors._brand = INFO.EMPTY_FIELD
        }

        if (!values._team_lead || !values._team_lead.length) {
            errors._team_lead = INFO.EMPTY_FIELD
        }

        if ((values.start_date && !values.end_date) || (!values.start_date && values.end_date)) {
            errors.date = INFO.DATE_ERROR;
        }

        if ((values.start_date && values.end_date) && (values.start_date > values.end_date)) {
            errors.date = INFO.DATE_VALID_ERROR;
        }

        if (values.budget) {
            let bud = typeof values.budget === "string" ? JSON.parse(values.budget) : values.budget
            let sum = 0;
            for (const keys in bud.subBudgets) {
                sum += +bud.subBudgets[keys]
            }
            if (bud.totalBudget !== sum && Object.keys(bud.subBudgets).length) {
                errors.budget = sum > bud.totalBudget ? `Budgets below are $${sum - bud.totalBudget} over the Total Budget` : `Budgets below are $${bud.totalBudget - sum} less then the Total Budget`
            }
        }
    }

    // setErrors(error);
    // if (!formIsValid) {
    //     setIsSending(false)
    // }
    return errors;
}

