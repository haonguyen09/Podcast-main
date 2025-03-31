import React from 'react'

const StarIcon = ({className, isRating, onClick}) => {
    return (
        <svg className={className} onClick={onClick} style={{ cursor: 'pointer', fill: isRating ? '#6e5fd3' : 'none' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7282 3.46937L14.668 6.66624C14.6594 7.10487 14.9433 7.6869 15.3044 7.94839L17.4371 9.53416C18.8044 10.5464 18.5808 11.7863 16.9469 12.2924L14.1693 13.1444C13.7049 13.2878 13.2147 13.7855 13.0944 14.2494L12.4322 16.7293C11.9076 18.6862 10.6005 18.8802 9.51692 17.1595L8.0034 14.7555C7.72821 14.3168 7.07465 13.9879 6.55868 14.0132L3.68647 14.1566C1.63118 14.2578 1.04641 13.0938 2.38793 11.5586L4.09062 9.61851C4.40881 9.25581 4.55499 8.58101 4.4088 8.12552L3.54029 5.40098C3.03292 3.79832 3.94446 2.91265 5.56977 3.43563L8.10664 4.25383C8.53662 4.38879 9.18157 4.296 9.54275 4.03451L12.1914 2.16192C13.6189 1.14972 14.7626 1.74019 14.7282 3.46937Z" stroke="#A6A7B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill={ isRating ? '#6e5fd3' : 'none'}/>
        </svg>
    )
}

export default StarIcon