
export default function ApplicationLogo({full = false, lang='EN', className = '', ...props}) {
    return (
        lang.toLocaleUpperCase() == 'FR'?
        <img src="/images/logo_fr.png" className={"rounded-full "+className} alt="" />
        :
        <img src="/images/logo_en.png" className={"rounded-full "+className} alt="" />
    );
}
