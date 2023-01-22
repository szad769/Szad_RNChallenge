import { PostOfficeListModel } from '../../screen/PostOfficeListModel';
import { PostOfficeModel } from '../../screen/PostOfficeModel';
import {WEB_SERVICE_STATUS} from '../networkConstant/Constant';


// It will handle response data and fill in model
export const postOfficeListResponseHandler = (response, mPostOfficeListModel) => {

    if(response !== undefined && response !== null) {

        if(response.status === 200){

            if(response.data !== undefined && response.data !== null && Array.isArray(response.data)){
                if(response.data[0].PostOffice !== undefined && response.data[0].PostOffice !== null){
                    mPostOfficeListModel.postOfficeList = parsePostOfficeList(response.data[0].PostOffice);
                }
                else{
                    mPostOfficeListModel.error = WEB_SERVICE_STATUS.noRecordFound
                }
            }
            else{
              mPostOfficeListModel.error = WEB_SERVICE_STATUS.noRecordFound
            }
        }
        else{
            mPostOfficeListModel.error = WEB_SERVICE_STATUS.noRecordFound
        }

    }
    else{
     mPostOfficeListModel.error = WEB_SERVICE_STATUS.errorInFetching;
    }
}

const parsePostOfficeList = data => {

    let mPostOffices = []

    if(data !== undefined && data !== null ){

        data.forEach((item, index) => {

            mPostOffices.push(parsePostOfficeData(item))
        })
    }

    return mPostOffices;
}

const parsePostOfficeData = data => {

    let mPostOffice = new PostOfficeModel();

    if(data !== undefined && data !== null ){

        mPostOffice.name = data.Name !== undefined && data.Name !== null ? data.Name : ''
        mPostOffice.branchType = data.BranchType !== undefined && data.BranchType !== null ? data.BranchType : ''
        mPostOffice.state = data.State !== undefined && data.State !== null ? data.State : ''
        mPostOffice.pinCode = data.Pincode !== undefined && data.Pincode !== null ? data.Pincode : ''
    }

    return mPostOffice;
}