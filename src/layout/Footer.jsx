import React from 'react';

const Footer = () => {
    return (
        <div className='w-full pt-8'>
            <div className='flex flex-col md:flex-row justify-center items-center text-center h-20 bg-gradient-to-br from-[#4779a4] to-[#f7e7ce] text-[#F1D8F4] md:tracking-widest leading-tight font-semibold px-4'>
                <h4>
                    &copy; {new Date().getFullYear()}
                    <span className='text-[#2c3e50]'> NH Studio </span>
                </h4>
                <h4 className='ml-3 text-[#2c3e50]'>Todos los derechos reservados.</h4>
            </div>
        </div>
    );
};

export default Footer;
