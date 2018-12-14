/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


/**
 * Function processes the response received from useraccess endpoint of the API.
 * Calculates EntityName,EntityId pairs in a hierarchical manner  for companies,parkings,parkingLots,parkingSublots.
 * Eg: For a company,its parkings,parkinglots,parkingsublots related info is stored along with the company's name and id.
 * @param response
 * @returns {{companyAccess: Array, parkingAccess: Array, parkingLotsAccess: Array, parkingSubLotsAccess: Array}}
 */
export function processUserAccesses(response) {

	let companyAccess = [];
	let parkingAccess = [];
	let parkingLotsAccess = [];
	let parkingSubLotsAccess = [];

	response.map((company)=>{

		let companyObj = {
			id:company.id,
			name:company.name,
			parkings:[],
			parkingLots:[],
			parkingSubLots:[]
		};
		
		company.parkings.map((parking)=>{

			let parkingObj = {
				id:parking.id,
				name:parking.name,
				parkingLots: [],
				parkingSubLots: []
			};
			
			parking.parkingLots.map((parkingLot)=>{

				let parkingLotObj = {
					id:parkingLot.id,
					name:parkingLot.name,
					parkingSubLots: []
				};
				
				parkingLot.parkingSubLots.map((parkingSubLot)=>{

					companyObj.parkingSubLots.push({
						id:parkingSubLot.id,
						type:parkingSubLot.type
					});

					parkingObj.parkingSubLots.push({
						id:parkingSubLot.id,
						type:parkingSubLot.type
					});

					parkingLotObj.parkingSubLots.push({
						id:parkingSubLot.id,
						type:parkingSubLot.type
					});

					parkingSubLotsAccess.push({
						id:parkingSubLot.id,
						type:parkingSubLot.type
					});

				});

				companyObj.parkingLots.push({
					id:parkingLot.id,
					name:parkingLot.name
				});

				parkingObj.parkingLots.push({
					id:parkingLot.id,
					name:parkingLot.name
				});

				parkingLotsAccess.push(parkingLotObj);

			});

			companyObj.parkings.push({
				id:parking.id,
				name:parking.name
			});
			
			parkingAccess.push(parkingObj);
		});

		companyAccess.push(companyObj);

	});

	return { companyAccess, parkingAccess, parkingLotsAccess, parkingSubLotsAccess };
	
}


export function getUserRedirectUrl(userAccesses) {
    let redirectUrl = "/";
    
	userAccesses.forEach(function (userAccess) {
        
        if(userAccess.accessTitle === "ADMIN_REPORT"){
            redirectUrl = "/reports";
        }
        else if(userAccess.accessTitle === "ADMIN_MANAGE"){
            redirectUrl = "/manage";
        }

    });

    return redirectUrl;
}



