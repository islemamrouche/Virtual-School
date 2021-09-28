import React from 'react'
import './AboutUs.css'

import i18n from "i18next";
import { useTranslation} from "react-i18next";


function AboutUs() {
  const { t } = useTranslation();
  return (
<React.Fragment>
<div class="services-section">
      <div class="inner-width">
        <h1 class="section-title">{t('why_us')}</h1>
        <div class="border"></div>
        <div class="services-container">

          <div class="service-box">
            <div class="service-icon">
            <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="service-title">{t('online_teaching')}</div>
            <div class="service-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
            </div>
          </div>

          <div class="service-box">
            <div class="service-icon">
            <i class="fas fa-chalkboard-teacher"></i>
            </div>
            <div class="service-title">{t('qualified_teachers')}</div>
            <div class="service-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
            </div>
          </div>

          <div class="service-box">
            <div class="service-icon">
            <i class="fas fa-project-diagram"></i>
            </div>
            <div class="service-title">{t('educational_events')}</div>
            <div class="service-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
            </div>
          </div>

          <div class="service-box">
            <div class="service-icon">
            <i class="fas fa-chalkboard"></i>
            </div>
            <div class="service-title">{t('online_training')}</div>
            <div class="service-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
            </div>
          </div>

          <div class="service-box">
            <div class="service-icon">
            <i class="fas fa-concierge-bell"></i>
            </div>
            <div class="service-title">{t('multiple_services')}</div>
            <div class="service-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
            </div>
          </div>

          <div class="service-box">
            <div class="service-icon">
            <i class="fas fa-money-bill-alt"></i>
            </div>
            <div class="service-title">{t('low_price')}</div>
            <div class="service-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
            </div>
          </div>
        </div>
      </div>
    </div>
</React.Fragment>
  )
}

export default AboutUs
