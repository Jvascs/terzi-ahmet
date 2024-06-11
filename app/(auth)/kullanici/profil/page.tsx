'use client';

import IconHome from '@/components/icon/icon-home';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

const ComponentsUsersAccountSettingsTabs = () => {
    const [tabs, setTabs] = useState<string>('home');
    const { user, isLoaded, isSignedIn } = useUser();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profession, setProfession] = useState('');
    const [country, setCountry] = useState('United States');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setProfession(user.publicMetadata?.profession || '');
            setCountry(user.publicMetadata?.country || 'United States');
            setAddress(user.publicMetadata?.address || '');
            setLocation(user.publicMetadata?.location || '');
            setPhone(user.phoneNumbers[0]?.number || '');
            setEmail(user.emailAddresses[0]?.emailAddress || '');
        }
    }, [isLoaded, isSignedIn, user]);

    const handleSave = async () => {
        if (!user) return; // Kullanıcı nesnesinin varlığını kontrol et

        try {
            await user.update({
                firstName,
                lastName,
                publicMetadata: {
                    profession,
                    country,
                    address,
                    location
                },
                phoneNumbers: [
                    {
                        id: user.phoneNumbers[0]?.id, // İlgili numaranın ID'sini güncelleyin
                        number: phone
                    }
                ],
                emailAddresses: [
                    {
                        id: user.emailAddresses[0]?.id, // İlgili e-posta adresinin ID'sini güncelleyin
                        emailAddress: email
                    }
                ]
            });
            alert('Profil başarıyla güncellendi!');
        } catch (error) {
            console.error('Profil güncelleme başarısız oldu:', error);
            alert('Profil güncelleme başarısız oldu');
        }
    };

    if (!isLoaded || !isSignedIn) {
        return <div>Yükleniyor...</div>; // Yükleme sürecinde kullanıcıya bilgi verin
    }

    return (
        <div className="pt-5">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Ayarlar</h5>
            </div>
            <div>
                <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
                    <li className="inline-block">
                        <button
                            onClick={() => setTabs('home')}
                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                        >
                            <IconHome />
                            Panel
                        </button>
                    </li>
                </ul>
            </div>
            {tabs === 'home' ? (
                <div>
                    <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
                        <h6 className="mb-5 text-lg font-bold">Genel Bilgiler</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="mb-5 w-full sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4">
                                <img src={user?.profileImageUrl || '/assets/images/profile-34.jpeg'} alt="img" className="mx-auto h-20 w-20 rounded-full object-cover md:h-32 md:w-32" />
                            </div>
                            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName">Ad</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Jimmy"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Soyad</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Turner"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="profession">Meslek</label>
                                    <input
                                        id="profession"
                                        type="text"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                        placeholder="Web Developer"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country">Ülke</label>
                                    <select
                                        id="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="form-select text-white-dark"
                                        name="country"
                                    >
                                        <option value="All Countries">Tüm Ülkeler</option>
                                        <option value="United States">Amerika Birleşik Devletleri</option>
                                        <option value="India">Hindistan</option>
                                        <option value="Japan">Japonya</option>
                                        <option value="China">Çin</option>
                                        <option value="Brazil">Brezilya</option>
                                        <option value="Norway">Norveç</option>
                                        <option value="Canada">Kanada</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="address">Adres</label>
                                    <input
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="New York"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="location">Konum</label>
                                    <input
                                        id="location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Location"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Telefon</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+1 (530) 555-12121"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">E-posta</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Jimmy@gmail.com"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mt-3 sm:col-span-2">
                                    <button type="button" onClick={handleSave} className="btn btn-primary">
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default ComponentsUsersAccountSettingsTabs;
