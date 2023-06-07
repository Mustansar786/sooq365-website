// const {auth} = this.props;
//         requestQueryQl({
//                 query: TopRatedVehicleQl,
//             },
//             () => {
//                 this.setState({topVehiclesLoading: false, refreshing: false});
//             }
//         ).then(response => {
//             const vehicles = response.data.topVehicles.sort((a, b) => b.rate_avg - a.rate_avg);
//             this.setState({data: vehicles, topVehiclesLoading: false, refreshing: false});
//         });

import gql from 'graphql-tag';

export const GetVehiclesByCategory = categoryID =>
  gql`
   query vehicles{
    vehicles( categoryId: "${categoryID}") {
        id
        approved_count
        instance_booking
        trim {
            name
        }
        attributes
        rate_avg
        thumb
        host_rate_avg
        price
        brand {
            name
        }
        model {
            name
        }
        owner {
            id
            rate_count
            rate_avg
            profile {
                first_name
                selfie_image
            }
        }
        images {
            imageUrl
        }
    }
}
`;


